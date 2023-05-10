
# Newsletters APP
Tech stack overview:
- Frontend
  - Vite
  - React.js
  - chakra
  - JavaScript
- API
  - Node.js
  - Express
  - Nodemailer
  - Mongodb
- AWS
  - EC2
  - S3

Both APPs are hosted on the same server using docker, every app has his own docker image to run on development mode or production mode.
- docker-compose.yml
  - setup the environment to run the frontend and API
- docker-compose.dev.yml
  - setup everything to run on the local environment

# Requirements on your pc
- node.js
- docker
- docker-compose

# Set up local environment using docker
> The backend must run using `docker` and `docker-compose`, the frontend app could run individually without docker jus running `npm install` and `npm run dev`.
- Set up environment variables, in the `root folder` create the `.env` file and configure the following environment variables.
  ```console
  # AWS access keys
  AWS_ACCESS_KEY_ID=SOMEACCESSKEY
  AWS_SECRET_ACCESS_KEY=SomeSecretKkey

  # Other environment variables
  MONGO_URL=mongodb://mongo/ # mongodb connection url
  SERVER_PORT=8000 # API server port

  # S3 bucket info
  S3_BUCKET_REGION=us-east-1 # S3 bucket region
  S3_BUCKET_NAME=newsletter-s3-bucket # S3 bucket name

  # Gmail SMTP info
  MAILER_PORT=587 #
  MAILER_HOST=smtp.gmail.com
  MAILER_USER=afakeemail@gmail.com
  MAILER_PASS=apasswordforthefakeemail


  # client domain
  CLIENT_DOMAIN=http://localhost:5173 # Frontend Application domain
  ```

- On the root folder run the following:
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


---

# Run production environment
On production in order to connect this project with `aws S3` you can connect the `EC2` instance with the `S3 bucket` using an `IAM role`.
https://docs.aws.amazon.com/sdkref/latest/guide/access-iam-roles-for-ec2.html
With this process AWS will automatically provide the access keys to the EC2 environment.

[Loading Credentials in Node.js from Environment Variables - AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html)

- Set up environment variables, in the `root folder` create the `.env` file and configure the following environment variables or yo could use any other method to set this environments variables depending on your production environment
  ```console
  # AWS access keys this could skipped with the IAM role
  AWS_ACCESS_KEY_ID=SOMEACCESSKEY
  AWS_SECRET_ACCESS_KEY=SomeSecretKkey

  # Other environment variables
  MONGO_URL=mongodb://mongo/ # mongodb connection url
  SERVER_PORT=8000 # API server port

  # S3 bucket info
  S3_BUCKET_REGION=us-east-1 # S3 bucket region
  S3_BUCKET_NAME=newsletter-s3-bucket # S3 bucket name

  # Gmail SMTP info
  MAILER_PORT=587 #
  MAILER_HOST=smtp.gmail.com

  # I set up this using AWS secrets
  MAILER_USER=afakeemail@gmail.com
  MAILER_PASS=apasswordforthefakeemail


  # client domain
  # this must be your frontend application domain
  CLIENT_DOMAIN=http://ec2-51-203-214-81.compute-1.amazonaws.com # e.g.
  ```

- On the root folder run the following:
  - Build services
    ```console
    docker-compose build
    ```

  - Start containers
    ```console
    docker-compose up
    ```

  - detached mode
    ```console
    docker-compose up -d
    ```
### Frontend
The app runs on production mode on the `http` port `80`

`http://localhost`

### Server API
The API node server is running on production mode on the following `8000` port

`http://localhost:8000/`

but all the calls to `domain/api` `http://localhost/api` are redirected using nginx to the `8000` port
