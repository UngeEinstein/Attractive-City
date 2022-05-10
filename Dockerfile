# Add node image
FROM node:14-buster-slim
RUN apt-get update

# Add python3
RUN apt-get install -y python3
RUN apt-get install -y python3-pip

WORKDIR /app
COPY ./shared ./shared
COPY ./backend ./backend
COPY ./python ./python

WORKDIR /app/python
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -r requirements.txt

WORKDIR /app/backend

EXPOSE 3001

RUN npm install
RUN npx tsc

CMD ["node", "./build/index.js"]
