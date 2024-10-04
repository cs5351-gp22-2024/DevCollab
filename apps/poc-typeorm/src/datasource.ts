import { DataSource } from "typeorm";
import { Flower, User } from "./entities";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "P@ssw0rd",
  database: "DevCollab",
  synchronize: false, // stop creating table automatically
  logging: true,
  entities: [User, Flower],
  subscribers: [],
  migrations: [],
});

export const getAppDataSource = () => AppDataSource;
