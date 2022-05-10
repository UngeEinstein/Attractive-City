import http from "../http-common";
import { Experience } from "shared";
import { BackendApi } from "shared";
import { ViewedExperience } from "shared";

const baseUrl = "api/experiences";

const getSaved = async (userId: string): Promise<ViewedExperience[]> => {
  const res = await http.get(baseUrl + "/list", {
    params: {
      userId: userId,
      viewType: "saved",
    },
  });
  return res.data;
};

const getIgnored = async (userId: string): Promise<ViewedExperience[]> => {
  const res = await http.get(baseUrl + "/list", {
    params: {
      userId: userId,
      viewType: "ignored",
    },
  });
  return res.data;
};

const postView = async (
  viewRequest: BackendApi.ExperiencesRegisterViewRequest
): Promise<void> => {
  await http.post(baseUrl + "/register_view", viewRequest);
};

const resetTestDB = async () => {
  await http.get(baseUrl + "/reset/testDB");
};

const getExperience = async (experienceId: number): Promise<Experience> => {
  const res = await http.get(baseUrl + "/experience", {
    params: {
      experienceId: experienceId,
    },
  });
  return res.data;
};

const experienceService = {
  getSaved,
  getIgnored,
  getExperience,
  postView,
  resetTestDB,
};

export default experienceService;
