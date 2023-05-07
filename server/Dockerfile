FROM node:18

# set working directory
RUN mkdir -p /app
WORKDIR /app

# cache app dependencies
COPY ./package.json ./

# install app dependencies
RUN npm i

# copy all the files to the container
COPY . .

# run build command to build the app
CMD ["npm", "run", "start"]
