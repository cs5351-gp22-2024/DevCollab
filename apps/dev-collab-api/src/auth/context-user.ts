import { injectable } from "inversify";
import { UserAccount } from "../function/user-account";
import { User } from "../entities/user";

export interface IContextUser {
  getUserId(token: string | null): Promise<number | null>;
}

@injectable()
export class ContextUser implements IContextUser {
  /**
   * @returns the user id of the current user
   */
  async getUserId(token: string | null): Promise<number | null> {
    if (token == null) return null;
    const user = await UserAccount.checkJWT(token);
    if (user.result == "SUCCESS") {
      return user.user!.userId;
    } else {
      return null;
    }
  }
}
