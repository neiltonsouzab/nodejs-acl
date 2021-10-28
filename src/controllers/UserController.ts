import { Request, Response } from "express";

import { CreateUserService } from "../services/CreateUserService";

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      username,
      password,
    });

    return response.status(201).json(user);
  }
}