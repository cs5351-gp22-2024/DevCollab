# DevCollab

## Modules

### Web

The frontend module. You may execute the following tasks under the folder `./apps/dev-collab-web`.

- 1st time setup: `npm ci`
- development: `npm run dev`

### Api

The api module. You may execute the following tasks under the folder `./apps/dev-collab-api`.

- 1st time setup: `npm ci`
- development: `npm run dev`

## Database

### Setup

We use Mysql as the database, so please either install it at the [official site](https://dev.mysql.com/downloads/) or from a [docker image](https://hub.docker.com/_/mysql).

Please also set the add the following login account in your local database.

```
Username: sa
Password: P@ssw0rd
```

After installing, you need to create an empty database with name `DevCollab` for our application.

### SQL

For each of the update sql, you need to put your sql into the folder `apps\dev-collab-api\src\sql`. The file name follows the following format `Feature_YYYYMMDD`.
