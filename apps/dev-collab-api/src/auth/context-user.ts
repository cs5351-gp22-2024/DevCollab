import { injectable } from "inversify";

export interface IContextUser {
  getUserId(): Promise<number | null>;
}

@injectable()
export class ContextUser implements IContextUser {
  /**
   * @returns the user id of the current user
   */
  async getUserId(): Promise<number | null> {
    return null;
  }
}
