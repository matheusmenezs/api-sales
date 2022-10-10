# Sales API

<img src="https://img-c.udemycdn.com/course/240x135/3669874_1417_4.jpg">

### Introduction:

Backend application developed in the course [API Restful with Nodejs](https://www.udemy.com/course/api-restful-de-vendas/) available on [Udemy](https://www.udemy.com/), for sales management with features for creating product registration, customer registration, purchase orders and a complete management of application users, with authentication via JWT Token, recovery password by email, profile update, avatar update, among other features. Also, the [PostgreSQL](https://www.postgresql.org/)  was used for data persistence and [Redis](https://redis.io/) for use cache in API.

The project was implemented during a learning incentive program at [PD Soluções](https://www.pdsolucoes.com.br/) (Evolution Moment).

### Requirement:
To improve the usability of the application, the Docker platform was used, which allows the packaging of an application or environment within a container making it portable to any other host that contains Docker installed.

Therefore, it is necessary to install the Docker tool in order to run the application. Installation instructions are contained in the official Docker documentation, available at [Docker](https://docs.docker.com/)

### Technologies:

[<img align="center" alt="Nodejs" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" style="max-width: 100%;"/>](https://nodejs.org/en/) [<img align="center" alt="Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg" style="max-width: 100%;"/>](https://www.typescriptlang.org/) [<img align="center" alt="Ex" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" style="max-width: 100%;"/>](https://expressjs.com/pt-br/) [<img align="center" alt="To" height="30" width="60" src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" style="max-width: 100%;"/>](https://typeorm.io/) [<img align="center" alt="Do" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" style="max-width: 100%;"/>](https://www.docker.com/) [<img align="center" alt="Ps" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" style="max-width: 100%;"/>](https://www.postgresql.org/) [<img align="center" alt="Ps" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" style="max-width: 100%;"/>](https://redis.io/)



### Run the Project:

1. Clone the repository, run in terminal: `git clone https://github.com/matheusmenezs/api-sales.git`.

2. Run `yarn` in terminal to install packages.

3. Create the `.env` file based on the `.env.example` and generate a secret. Set the values of Postgres environment variables with your database credentials.

4. Configure the database on a platform for PostgreSQL with credentials that were defined.

5. Run in terminal: `docker-compose up -d` to initialize container.

6. Run in terminal: `yarn typeorm migration:run -d ./src/shared/typeorm/datasource.ts` to execute migrations.

7. Copy raw contents of `api.json` from `docs` to Insomnia or in other program to test APIs.

8. Run in terminal: `yarn dev` to initialize project.

### Endpoints

| Name                    | Function |
| ----------------------- | -------- |
| `POST` /users           |create user|
| `PATCH` /users/avatar   |user avatar upload|
| `GET` /users            |list users|
| `POST` /sessions        |authenticate user|
| `UPDATE` /profile       |update user profile|
| `GET` /profile          |view authenticated user profile|
| `POST` /password/forgot |token request for password reset|
| `POST` /password/reset  |reset password using requested token|
| `POST` /customers       |create customer|
| `UPDATE` /customers/id  |update customer using the id|
| `DELETE` /customers/id  |delete customer using the id|
| `GET` /customers        |list customers|
| `GET` /customers/id     |view one customer using the id|
| `POST` /products        |create product|
| `UPDATE` /products/id   |update product using the id|
| `DELETE` /products/id   |delete product using the id|
| `GET` /products         |list products|
| `GET` /products/id      |view product using the id|
| `POST` /orders          |create order|
| `DELETE` /orders/id     |delete order using the id|
| `GET` /orders/id        |view one order using the id|
