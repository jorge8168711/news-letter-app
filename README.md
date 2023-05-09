# Set up environment using docker
> In order to run the backend environment is necessary to have installed docker and docker-compose, the frontend app could run individually without docker.

## Docker compose environment variables
```console
MONGO_URL: mongo db url
PORT: api port

# these must match with your bucket name and region
S3_BUCKET_REGION: s3 bucket region
S3_BUCKET_NAME: s3 bucket name
```

# Run local environment
On the local environment in order to connect to the S3 bucket you need to provide the following environment variables:
```console
AWS_ACCESS_KEY_ID=your access key
AWS_SECRET_ACCESS_KEY= your secret access key
```

you can use a `.env` file, the docker compose for the dev environment already has the field `env_file` if you put a `.env` file on the project root folder the connection with the `s3` must work.

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

`http://localhost:5173/`

### Server API
The app is running on development mode using nodemon.

`http://localhost:8000/`


# Run production environment
On production in order to connect this project with `aws s3` you can connect the `EC2` instance with the `S3 bucket` using an `IAM role`.
https://docs.aws.amazon.com/sdkref/latest/guide/access-iam-roles-for-ec2.html

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
The app is running on production mode on the `http` port `80`

`http://localhost`

### Server API
The API node server is running on production mode on the following port

`http://localhost:8000/`

but is redirected to http://localhost/api
