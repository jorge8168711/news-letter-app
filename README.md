# Set up environment using docker
> In order to run the backend environment is necessary to have installed docker and docker-compose, the frontend app could run individually without docker.


# Run local environment
> On the root folder run the following:

- Build services
  ```console
  docker-compose -f docker-compose.dev.yml build
  ```

- Start containers
  ```console
  docker-compose -f docker-compose.dev.yml up
  ```

  detached mode
  ```console
  docker-compose -f docker-compose.dev.yml up -d
  ```
When the docker setup is successfully completed you must be able to open the backend and the frontend applications.

### Frontend
The app is running on development mode using the vite compiler.

`http://localhost:8000/`

### Server API
The app is running on development mode using nodemon.

`http://localhost:5000/`


# Run production environment
On the root folder run the following:

- Build services
  ```console
  docker-compose build
  ```

- Start containers
  ```console
  docker-compose up
  ```

  detached mode
  ```console
  docker-compose up -d
  ```

### Frontend
The app is builded configure the nginx server to serve the builded app, the image expose the port `80` of the docker image the port `8000` of the host.

### Server API
The app is mounted on the port 5000, the image expose the port `5000` of the docker image the port `5000` of the host.
