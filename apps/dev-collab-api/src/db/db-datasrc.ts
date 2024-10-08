import { DataSource } from "typeorm";
import { Project } from "../entities/project";
import { Verification } from "../entities/verification"
import { Sprint } from "../entities/sprint";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "P@ssw0rd",
  database: "DevCollab",
  synchronize: false, // stop creating table automatically
  logging: true,
  entities: [Project, Sprint,Verification],
  subscribers: [],
  migrations: [],
  timezone: "Z",
});
