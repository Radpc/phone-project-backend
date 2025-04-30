# Device project - Backend

## Description
A backend project for an entrance exame, that has device and category management (as requested) but also a few extras.

## Stack
The project was made using the NestJS framework, with the help of the Prisma ORM.

## How to run
Currently, this project is hosted on a private subnet on AWS, serving for the Device project - Frontend, but you can run it locally.

### Manual local running
You will need a mysql database access to run it locally. You can configure one using this [docker image](https://hub.docker.com/_/mysql).
- First run `npm i`, to install dependecies
- Create an `.env` file, where you will store the `DATABASE_URL` Environment Variable
- Run `npx prisma migrate dev` to migrate the schema to your database
- (optional) Run `npx prisma db seed` to create dummy data
- Run `npm run start:dev` to serve the project on `http://localhost:3000/`

After serving the API, you can access [the docs](http://localhost:3000/api).

### Docker
- Create an `.env` file, where you will store the `DATABASE_URL` Environment Variable
- Build and run the `Dockerfile` on the root folder.

## Keypoints
**Important**: Even though the specification said authentication `was not needed`, it IS implemented in the project. Every route (other than login) will need a Bearer token auhorization header! 

### Authentication module
The project has routes and services to `login` devices, and some parameters to help the requests.

### Device module
The project has routes and services to `create`, `edit`, `get-by-id` and `list` devices, and some parameters to help the requests.

### Device category module
The project has routes and services to `create`, `edit`, `get-by-id` and `list` category devices, and some parameters to help the requests.
