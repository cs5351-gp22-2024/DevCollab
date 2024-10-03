import { DataSource } from "typeorm";
import { User } from "./entities";

export const createUser = async (ds: DataSource, name: string) =>
  ds.manager.transaction(async (transactionalEntityManager) => {
    const userRepository = transactionalEntityManager.getRepository(User);

    const user = new User();

    user.name = name;

    await userRepository.insert(user);
  });
