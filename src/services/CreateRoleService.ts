import { AppError } from "../error/AppError";
import { Role } from "../models/Role";
import { RoleRepository } from "../repositories";

type CreateRoleRequest = Pick<Role, 'name' | 'description'> & {
  permissions: string[];
};

export class CreateRoleService {
  async execute({ name, description, permissions }: CreateRoleRequest): Promise<Role> {
    const roleAlreadyExists = await RoleRepository().findOne({ name });

    if (roleAlreadyExists) {
      throw new AppError('Role already exists.');
    }

    const permissionsObject = permissions.map(permission => ({
      id: permission
    }));

    const role = RoleRepository().create({
      name,
      description,
      permissions: permissionsObject,
    });

    await RoleRepository().save(role);

    return role;
  }
}