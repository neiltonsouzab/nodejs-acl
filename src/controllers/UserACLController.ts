import { Request, Response } from "express";

import { CreateUserACLService } from "../services/CreateUserACLService";

export class UserACLController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user_id, roles, permissions } = request.body;

    const createUserACLService = new CreateUserACLService();

    const acl = await createUserACLService.execute({
      user_id,
      roles,
      permissions
    });

    return response.json(acl);
  }
}