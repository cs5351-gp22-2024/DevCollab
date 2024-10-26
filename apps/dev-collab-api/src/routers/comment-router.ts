import { Router } from "express";
import { CommentService } from "../services/comment-service";

export class CommentRouter {
  private router: Router;

  constructor(private commentService: CommentService) {
    this.router = Router();
  }

  public initializeRoutes(): Router {

    this.router.post("/api/comment/create", async (req, res) => {
      const comment = await this.commentService.createComment(req.body);
      res.status(200).json(comment);
    });

    this.router.get("/api/comment/get", async (req, res) => {
      const comment = await this.commentService.getComments();
      res.status(200).json(comment);
    });

    this.router.get("/api/comment/get/:projectId", async (req, res) => {
      const comment = await this.commentService.getCommentsByProjectId(Number(req.params.projectId));
      res.status(200).json(comment);
    });

    this.router.get("/api/comment/get/:taskId", async (req, res) => {
      const comment = await this.commentService.getCommentsByTaskId(Number(req.params.taskId));
      res.status(200).json(comment);
    });

    return this.router;
  }
}