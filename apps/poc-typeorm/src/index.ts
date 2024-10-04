import { isEmpty } from "lodash";
import "reflect-metadata";
import { ILike } from "typeorm";
import { getAppDataSource } from "./datasource";
import { User } from "./entities";
import { createFlower, createUser } from "./logics";

const ds = getAppDataSource();

ds.initialize().then(async (ds) => {
  /**
   * Create user
   */
  const user = await createUser(ds.manager, "Tim Yau");

  /**
   * Create flower with user
   */
  await createFlower(ds.manager, user);

  /**
   * Fetch user with flowers
   */
  const userRepo = ds.manager.getRepository(User);

  const tims = await userRepo.find({
    where: {
      name: ILike("Tim Yau%"),
    },
    relations: {
      flowers: true,
    },
  });

  if (tims.length === 0) {
    console.log("No such user");
  } else {
    const withFlowers = tims.filter((t) => !isEmpty(t.flowers));

    console.log(`There are ${withFlowers.length} tims with flower`);
  }

  /**
   * Update user
   */
  for (const tim of tims) {
    tim.name = tim.name?.toUpperCase() || tim.name;
    tim.updated = new Date();
  }
  await userRepo.save(tims);

  /**
   * Delete user
   */
  const evenTims = tims.filter((t) => t.userId % 2 === 0);
  for (const t of evenTims) {
    console.log(
      `removing user ${t.userId} and flowers ${t.flowers?.map((f) => f.flowerId)}`
    );
    await ds.manager.remove([t, ...(t.flowers || [])]);
  }

  ds.destroy();
});
