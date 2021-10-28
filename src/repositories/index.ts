import { getRepository } from "typeorm";

import { Permission } from "../models/Permission";
import { Product } from "../models/Product";
import { Role } from "../models/Role";
import { User } from "../models/User";

export const UsersRepository = () => getRepository(User);

export const PermissionsRepository = () => getRepository(Permission);

export const RoleRepository = () => getRepository(Role);

export const ProductsRepository = () => getRepository(Product);