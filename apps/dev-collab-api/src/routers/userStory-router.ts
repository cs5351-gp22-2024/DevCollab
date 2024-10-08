// routers/userStory-router.ts
import { Router } from "express";
import { UserStoryService } from "../services/userStory-service";

export class UserStoryRouter {
  private router: Router;

  constructor(private userStoryService: UserStoryService) {
    this.router = Router();
  }

  public initializeRoutes(): Router {
    this.router.get("/", async (req, res) => {
      const userStories = await this.userStoryService.getAllUserStories();
      res.json(userStories);
    });

    this.router.post("/", async (req, res) => {
      const userStory = await this.userStoryService.createUserStory(req.body);
      res.status(201).json(userStory);
    });

    this.router.get("/:id", async (req, res) => {
      const userStory = await this.userStoryService.getUserStoryById(Number(req.params.id));
      res.json(userStory);
    });

    this.router.put("/:id", async (req, res) => {
      const updatedUserStory = await this.userStoryService.updateUserStory(Number(req.params.id), req.body);
      res.json(updatedUserStory);
    });

    this.router.delete("/:id", async (req, res) => {
      await this.userStoryService.deleteUserStory(Number(req.params.id));
      res.status(204).send();
    });

    return this.router;
  }
}
