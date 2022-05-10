import json
from operator import index
import numpy as np
from numpy.core.fromnumeric import argsort
import pandas as pd
from pandas.core.frame import DataFrame
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel 
import sys
from io import StringIO

class UserProfile:

   def __init__(self, id, df: DataFrame):
      self.id = id
      self.views = df 
      self.rated_experiences = []

   def get_ratings(self):
      ratings = self.views.copy(deep=True)
      ratings = ratings[["experienceId", "viewType"]]
      ratings.loc[ratings.viewType == "ignored", "viewType"] = 0
      ratings.loc[ratings.viewType == "seen", "viewType"] = 1
      ratings.loc[ratings.viewType == "saved", "viewType"] = 3
      ratings.loc[ratings.viewType == "favorite", "viewType"] = 5
      ratings.rename(columns={"viewType": "rating"}, inplace=True)
      
      # Saving the experiences that have been rated (all viewTypes except 'seen')
      experiences_rated = ratings.loc[ratings["rating"].isin([0, 3, 5])]
      self.rated_experiences = experiences_rated["experienceId"].to_list()
      return ratings


class ContentBasedFilter:

   def __init__(self, user:UserProfile, df: DataFrame):
       self.df = df
       self.user = user
       self.tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
      
       self.create_model()
   
   def reformat_tags(self, x):
      tag_names = ""
      for tag in x:
         tag_names += f'{tag["name"]}, ' 
      return tag_names


   def generate_vocabulary(self, df: pd.DataFrame):
      df["tags"] = df["tags"].apply(self.reformat_tags)
      df["document"] = df["tags"] + " " + df["description"] + " "+ df["detailedDescription"]
      return self.tf.fit_transform(df["document"])

   def build_user_profile(self, tfidf_matrix):
      ratings = self.user.get_ratings()
      rated_experiences = self.df.merge(ratings, on="experienceId")
      rated_experiences["weight"] = rated_experiences["rating"]/5
      idx = [i-1 for i in rated_experiences["experienceId"]]
      user_profile = np.dot(tfidf_matrix[idx].toarray().T, rated_experiences["weight"].values)
      return user_profile


   def create_model(self):
      experience_tfidf_matrix = self.generate_vocabulary(df=self.df)
      user_profile = self.build_user_profile(experience_tfidf_matrix)
      cosine_similarities = linear_kernel(np.atleast_2d(user_profile), experience_tfidf_matrix)
      #print(json.dumps(cosine_similarities.tolist()))
      R = argsort(cosine_similarities)[:, ::-1]
      recommendations = [i for i in R[0]]
      #print(recommendations)
      recommended_experiences = self.df.iloc[recommendations]
      # Removing experiences the user already has rated
      recommended_experiences = recommended_experiences[~recommended_experiences["experienceId"].isin(self.user.rated_experiences)]
      recommended_experiences = recommended_experiences["experienceId"]
      if len(recommended_experiences.index) > 0:
         print(recommended_experiences.to_string(index=False))
      else: 
         print([])
      

if __name__ == "__main__":
   lines = sys.stdin.read()
   json_data = json.loads(lines)
   userId = json_data["userId"]
   views = json.dumps(json_data["views"])
   df = pd.read_json(views, orient="records")
   df["userId"] = df["userId"].astype(str)
   df = df[df["userId"] == userId] # Only interested in views of the current user
   if not df.empty:
      user = UserProfile(userId, df)
      experiences = StringIO(json.dumps(json_data["experiences"]))
      df = pd.read_json(experiences, orient="records")
      cbf = ContentBasedFilter(user, df)
   print()
