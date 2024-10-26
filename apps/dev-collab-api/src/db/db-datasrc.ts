import { DataSource } from "typeorm";
import { Project } from "../entities/project";
import { Verification } from "../entities/verification";
import { Sprint } from "../entities/sprint";
import { UserStory } from "../entities/userStory";
import { User } from "../entities/user";
import { Group } from "../entities/group";
import { GroupMember } from "../entities/groupMember";
import { Invitation } from "../entities/Invitation";
import { Comment } from "../entities/comment";

// AppDataSource: TypeORM configuration
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "P@ssw0rd",
  database: "DevCollab",
  synchronize: false,
  logging: true, // Enable logging for debugging purposes
  entities: [
    Project,
    Sprint,
    Verification,
    UserStory,
    User,
    Group,
    GroupMember,
    Invitation,
    Comment
  ], // Your entity classes
  subscribers: [],
  migrations: [],
  timezone: "Z",
});
