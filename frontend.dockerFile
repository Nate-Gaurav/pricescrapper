FROM node:21.5.0
WORKDIR /pricewise
RUN apt-get update 
RUN apt-get install nano -y
RUN apt-get install iputils-ping -y
COPY . .
RUN npm install 
RUN npm run build
CMD [ "/bin/bash", "-c", "npm run start"]