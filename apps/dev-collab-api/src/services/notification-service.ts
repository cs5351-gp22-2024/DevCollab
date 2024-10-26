import { inject, injectable } from "inversify";
import { IDbContext } from "../db/db-context";
import { Comment } from "../entities/comment";
import { Notification } from "../entities/notification";

@injectable()
export class NotificationService {
  constructor(
    @inject("IDbContext") private dbContext: IDbContext // Inject DbContext
  ) {}

  // testing get all records
  async getNotifications(): Promise<Notification[]> {
  
    return await this.dbContext.notifications.find()
  }

  async getCurrentUserUnReadNotificationCount(user_id: number) {

    const unReadCount = await this.dbContext.notifications.countBy({
      mentioned_user_id: user_id,
      is_read: false
    });

    return unReadCount 
  }

  async getCurrentUserUnReadNotificationRecords(user_id: number) {

    const query = `
      SELECT 
        n.notification_id,
        n.mentioned_user_id,
        mentioned_user.name as mentioned_user_name,
        n.is_read,
        c.comment_id,
        c.project_id,
        c.task_id,
        c.comment,
        c.author_user_id,
        author_user.name as author_name,
        c.create_date
      FROM notification n
      LEFT JOIN comment c ON n.comment_id = c.comment_id
      LEFT JOIN users mentioned_user ON n.mentioned_user_id = mentioned_user.user_id
      LEFT JOIN users author_user ON c.author_user_id = author_user.user_id
      WHERE n.mentioned_user_id = ?
      AND n.is_read = false
      ORDER BY c.create_date DESC
    `;

    const notifications = await this.dbContext.notifications.query(query, [user_id]);
    return notifications;
  }


}
