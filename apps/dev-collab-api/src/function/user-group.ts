import { AppDataSource } from "../db/db-datasrc";
import { Group } from "../entities/group";
import { GroupMember } from "../entities/groupMember";
import { UserAccount } from "./user-account";

export class UserGroup {
  static async createGroup(group_name: string, user_id: string) {
    const user = await UserAccount.getRecordById(parseInt(user_id));
    if (user == null) {
      return { result: "UNSUCCESS", error: "CANNOT_FIND_USER" };
    }
    if (group_name == "") {
      group_name = "TempGroup";
    }
    const group = new Group(group_name, user.userId.toString());

    const savedGroup = await group.save();
    if (savedGroup != null) {
      return { result: "SUCCESS", group_id: savedGroup.group_id };
    } else {
      return { result: "UNSUCCESS", error: "CANNOT_CREATE_GROUP" };
    }
  }
  static async joinGroup(
    group_id: string,
    user_id: string,
    group_role: string
  ) {
    const user = await UserAccount.getRecordById(parseInt(user_id));
    if (user == null) {
      return { result: "UNSUCCESS", error: "CANNOT_FIND_USER" };
    }

    const group = await this.getGroup(parseInt(group_id));
    if (group == null) {
      return { result: "UNSUCCESS", error: "CANNOT_FIND_GROUP" };
    }
    const member = new GroupMember(group, user, group_role);
    const savedMember = await member.save();
    if (savedMember != null) {
      return {
        result: "SUCCESS",
        member: {
          group_id: group_id,
          member_id: member.memberId,
          group_role: group_role,
        },
      };
    } else {
      return { result: "UNSUCCESS", error: "CANNOT_JOIN_GROUP" };
    }
  }

  static async getGroup(group_id: number): Promise<Group | null> {
    const record = await AppDataSource.getRepository(Group).findOne({
      where: { group_id },
      order: { create_time: "DESC" },
    });
    return record;
  }
  static async getGroupMember(memberId: number): Promise<GroupMember | null> {
    const record = await AppDataSource.getRepository(GroupMember).findOne({
      where: { memberId },
    });
    return record;
  }
}
