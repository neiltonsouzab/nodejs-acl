import { Request, Response } from "express";
import { CreatePermissionService } from "../services/CreatePermissionService";

export class PermissionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermissionService = new CreatePermissionService();

    const permission = await createPermissionService.execute({
      name,
      description
    });

    return response.status(201).json(permission);
  }
}