FROM node:18 AS vite-build

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
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=vite-build /app/dist ./

