// services/userStory-service.ts
import { inject, injectable } from "inversify";
import { IDbContext } from "../db/db-context";
import { UserStory } from "../entities/userStory";

@injectable()
export class UserStoryService {
  constructor(
    @inject("IDbContext") private dbContext: IDbContext // Inject DbContext
  ) {}

  // Create a new user story
  async createUserStory(data: Partial<UserStory>): Promise<UserStory> {
    const userStory = this.dbContext.userStories.create(data);
    this.dbContext.needCreate(userStory);
    await this.dbContext.save();  // Save transaction
    return userStory;
  }

  // Find all user stories
  async getAllUserStories(): Promise<UserStory[]> {
    return await this.dbContext.userStories.find();
  }

  // Find user story by ID
  async getUserStoryById(id: number): Promise<UserStory | null> {
    return await this.dbContext.userStories.findOneBy({ userStoryId: id });
  }

  // Update user story
  async updateUserStory(id: number, data: Partial<UserStory>): Promise<UserStory | null> {
    const userStory = await this.getUserStoryById(id);
    if (userStory) {
      Object.assign(userStory, data);
      this.dbContext.needUpdate(userStory);
      await this.dbContext.save();
    }
    return userStory;
  }

  // Delete user story
  async deleteUserStory(id: number): Promise<void> {
    const userStory = await this.getUserStoryById(id);
    if (userStory) {
      this.dbContext.needRemove(userStory);
      await this.dbContext.save();
    }
  }
}
