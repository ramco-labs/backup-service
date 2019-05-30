# Node Skeleton

A boilerplate to help start Node.js projects quickly and effectively. Packaged with Typescript, Docker, PM2, Eslint, VSCode config, Winston, Typedoc, Nodemon, AVA, PromClient, JWT, OpenAPI/Swagger, etc.

## Motive behind this project

Having worked on a lot of node.js projects, I had to repetitively do the same tasks over and over again, get a project structure, install stuff, implement standardization, containerize it, implement logging, and make sure everything is in place before I start off. This takes all the burden out and lets people focus just on the logic and nothing else. 

You can find the article I wrote on this project here: [https://medium.com/techahoy/building-a-boilerplate-for-microservices-part-1-166ce00f5ce9](https://medium.com/techahoy/building-a-boilerplate-for-microservices-part-1-166ce00f5ce9)

## Basic Concepts behind the architecture

1. All the code you write resides within `src` folder and gets built when you start the server in `dist` folder.
2. All configuration is stored against the respective environment in `src/config/env` folder and `.env` file in the root.
3. All your navigation routes are placed in `src/app/routes` folder. You can place as many js files as you want within.
4. All your logic is written in controllers placed within `src/app/controllers` folder.
5. If you have utility functions which you will use across controllers, put them in `src/app/utils` folder.
6. All the server side rendered template files are to be placed in `src/app/views` folder.
7. All your static files and content is to be placed in the `public` folder.

## Deployment instructions

### Normal Installation

1. Install node.js and git
2. Add them to path if not already in path.
3. Install typescript globally with `npm install typescript -g`
4. Run npm install to get all the dependencies installed
5. cd to the project directory and run tsc to build using typescript
6. Run `npm run-script start-dev`

### Cloning & Running with Docker

1. Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
2. Clone/Download the repository and CD to it
2. Run `docker-compose up` to get the containers installed and started.

### Pulling & Running from Docker Hub

1. Pull the container from DockerHub with the command `docker pull tvvignesh/node-skeleton` (Add version if you want)

2. Then, start the container using the command:
`docker run -d -p 8085:8085 -p 9229:9229 -e NODEJS_PORT=8085 -e NODE_ENV=development -e NODEJS_IP=0.0.0.0 tvvignesh/node-skeleton`

### Running via PM2

1. Install node.js and [pm2](https://github.com/Unitech/pm2)
2. CD to the pm2 directory
3. Run `pm2 start pm2-dev.json` to start the development cluster

## Building the code

1. Run `npm run build` to build the typescript code, copy relevant files

## Logging Middleware

Winston logging can be added by using the winston library.
`logger.log('error', 'Internal server error - ' + err.stack, err);`

By default, logging occurs in console in the development environment and gets written to files within logs folder in other environments.

## Static Files

You can place all your static files in the `public` directory and that will get served by the server directly

## Exposing Metrics

The project is bundled with [prom-client](https://github.com/siimon/prom-client) to enable exporting the metrics to prometheus with ease. You can access the default metrics at "/metrics" endpoint. You can modify what you export in `src/app/controllers/metrics.server.controllers.ts`

## Linting

You can customize rules if needed using the .eslintrc file placed in the root directory. If you are using VSCode, you can have the ESLint extension installed. While linting is run everytime you build/start the server, you can manually run it by `npm run lint`

## Generate API Documentation (OpenAPI/Swagger)

You can generate documentation site by providing details regarding all the endpoints in the `apidoc.yaml` file in the root and once done, you can start the server and your documentation will get exposed in `/api-docs` URL. You can use tools like [OpenAPI GUI](https://mermade.github.io/openapi-gui/) to help generate the YAML file for you.

## Generate Code Documentation

You can generate documentation based on your code by running `npm run document`. Once generated, you can find the documentation in the docs folder. See [this](http://typedoc.org/guides/doccomments/) to know how to document your code to be rendered by the doc generator.

## JWT Authentication

Helpers Utilities for doing JWT authentication is added to `src/app/utils/auth.utils.ts` and controllers for the same in `src/app/controllers/auth.server.controller.ts`. The private and public keys are placed in the `creds` folder. You can generate your own by using tools like [this](http://travistidwell.com/jsencrypt/demo/).

No database implementation has been made so far and hence you may need to add your own tables/collections, create users, store secret keys, etc. which is more of an implementation detail.

## Running Tests

You can run your tests by using `npm run test` command. The project is bundled with [AVA](https://github.com/avajs/ava) as the test framework.

## Environmental Variables

You can set up the environmental variables in the .env file and that will get used in files like docker-compose, Dockerfile, etc. In addition to this, you can set up the rest of the environmental configurations in `config/env/yourenv.ts` where yourenv can be anything and the respective configs will get loaded depending on env you set.

## Compatibility

Since this project uses all the latest features of the node ecosystem, it requires Node >= v10.0.0

## Contributors

1. <a href="https://github.com/tvvignesh">Vignesh T.V.</a> - https://www.tvvignesh.com

## Contributing Guide

1. Find any bugs? Please raise it as an issue.
2. Have something to contribute? Please raise a pull request.
3. Looking for enhancements? Please check the milestones, and if you don't find it, raise an issue.

## Using this Project?

Incase you are using this project, please let me know by dropping me a mail to vigneshviswam@gmail.com or raising an issue, I will add you to the list of users.

## Donations?

Since I am doing this project purely out of interest, I am not looking for donations. But, if you want to do something, donate for charity on behalf of this project and I will add you to the contributors list.

### License

MIT