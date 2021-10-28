import { Role } from "../models/Role";
import { RoleRepository } from "../repositories";

export class ListRoleService {
  async execute(): Promise<Role[]> {
    const roles = await RoleRepository().find({
      relations: ['permissions']
    });

    return roles;
  }
}