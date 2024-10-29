import { inject, injectable } from "inversify";
import { UserModel } from "shared/models/user";
import { TYPES } from "../container/types";
import { mapUserToUserModel } from "../mappers/user";
import { IUserRepository } from "../repositories/user-repository";

export interface IUserService {
  getAllUsers(): Promise<UserModel[]>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUserRepository)
    private _userRepository: IUserRepository
  ) {}

  async getAllUsers(): Promise<UserModel[]> {
    const users = await this._userRepository.getAllUsers();

    return users.map((p) => mapUserToUserModel(p));
  }
}
