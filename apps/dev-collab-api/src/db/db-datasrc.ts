import { DataSource } from "typeorm";
import { Project } from "../entities/project";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "password",
  database: "DevCollab",
  synchronize: false, // stop creating table automatically
  logging: true,
  entities: [Project],
  subscribers: [],
  migrations: [],
  timezone: "Z",
});
