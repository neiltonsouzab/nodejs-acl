import { classToClass } from "class-transformer";
import { AppError } from "../error/AppError";
import { User } from "../models/User";
import { PermissionsRepository, RoleRepository, UsersRepository } from "../repositories";

type CreateUserACL = {
  user_id: string;
  roles: string[];
  permissions: string[];
}

export class CreateUserACLService {
  async execute({ user_id, roles, permissions }: CreateUserACL): Promise<User> {
    const user = await UsersRepository().findOne(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (!!roles.length && !!permissions.length) {
      throw new AppError('Roles or permissions cam not be empty.');
    }

    const rolesObjects = await RoleRepository().findByIds(roles);
    const permissionsObjects = await PermissionsRepository().findByIds(permissions);

    user.roles = rolesObjects;
    user.permissions = permissionsObjects

    await UsersRepository().save(user);

    return classToClass(user);
  }
}