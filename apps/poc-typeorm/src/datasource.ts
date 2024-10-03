import { DataSource } from "typeorm";
import { Flower, User } from "./entities";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "P@ssw0rd",
  database: "PocTypeorm",
  synchronize: true,
  logging: true,
  entities: [User, Flower],
  subscribers: [],
  migrations: [],
});

export const getAppDataSource = () => AppDataSource;
