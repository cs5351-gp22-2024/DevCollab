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

Please also add the following login account in your local database.

```yaml
username: sa
password: P@ssw0rd
```

After installing, you need to create an empty database with name `DevCollab` for our application.

Then, make sure that the db works work with the following connection parameters.

```yaml
host: "127.0.0.1"
port: 3306
username: "root"
password: "P@ssw0rd"
database: "DevCollab"
```

### SQL

For each of the update sql, you need to put your sql into the folder `apps\dev-collab-api\src\sql`. The file name follows the following format `Feature_YYYYMMDD`.
