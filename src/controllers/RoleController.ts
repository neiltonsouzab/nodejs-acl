import { Request, Response } from "express";
import { CreateRoleService } from "../services/CreateRoleService";
import { ListRoleService } from "../services/ListRoleService";

export class RoleController {
  async list(request: Request, response: Response): Promise<Response> {
    const listRoleService = new ListRoleService();

    const roles = await listRoleService.execute();

    return response.json(roles);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, permissions } = request.body;

    const createRoleService = new CreateRoleService();

    const role = await createRoleService.execute({
      name,
      description,
      permissions
    });

    return response.status(201).json(role);
  }
}