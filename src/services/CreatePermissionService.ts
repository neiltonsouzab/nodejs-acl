import { AppError } from "../error/AppError";
import { Permission } from "../models/Permission";
import { PermissionsRepository } from "../repositories";

type RequestCreatePermission = Pick<Permission, 'name' | 'description'>;

export class CreatePermissionService {
  async execute({ name, description }: RequestCreatePermission): Promise<Permission> {
    const permissionAlreadyExists = await PermissionsRepository().findOne({ name });

    if (permissionAlreadyExists) {
      throw new AppError('Permission already exists');
    }

    const permission = PermissionsRepository().create({
      name,
      description,
    });

    await PermissionsRepository().save(permission);

    return permission;
  }
}