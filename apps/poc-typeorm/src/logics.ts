import { EntityManager } from "typeorm";
import { Flower, User } from "./entities";

export const createUser = async (manager: EntityManager, name: string) =>
  manager.transaction(async (transactionalEntityManager) => {
    const userRepository = transactionalEntityManager.getRepository(User);

    const user = new User();

    user.name = name;

    await userRepository.insert(user);

    console.log(`insert user ${user.userId}`);

    return user;
  });


export const createFlower = async (manager: EntityManager, user: User) => manager.transaction(async (transactionalEntityManager) => {
  const flowerRepository = transactionalEntityManager.getRepository(Flower);
  const rose = new Flower();

  rose.name = 'Rose';
  rose.user = user;

  await flowerRepository.insert(rose);

  console.log(`insert flower ${rose.flowerId} with user ${user.userId}`);

  return rose;
});