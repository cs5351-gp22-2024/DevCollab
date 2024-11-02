import { inject, injectable } from "inversify";
import { IDbContext } from "../db/db-context";
import { Comment } from "../entities/comment";

@injectable()
export class CommentService {
  constructor(
    @inject("IDbContext") private dbContext: IDbContext // Inject DbContext
  ) {}

  // Create a comment
  async createComment(data: Partial<Comment>): Promise<Comment> {
    const comment = this.dbContext.comments.create(data);

    data.create_date = new Date;
    
    this.dbContext.needCreate(comment);
    await this.dbContext.save(); 
    return comment;
  }

  // Find comment by project_id
  async getComments(): Promise<Comment[]> {
  
    return await this.dbContext.comments.find()
  }

  
  // Find comment by project_id
  async getCommentsByProjectId(project_id: number): Promise<Comment[]> {
    return await this.dbContext.comments.findBy({
      project_id: project_id
    });
  }

  // Find comment by task_id
  async getCommentsByTaskId(task_id: number): Promise<Comment[]> {
    return await this.dbContext.comments.findBy({
      task_id: task_id
    });
  }

}
