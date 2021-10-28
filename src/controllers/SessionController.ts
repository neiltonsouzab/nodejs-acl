import { Request, Response } from "express";
import { CreateSessionService } from "../services/CreateSessionService";

export class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createSessionService = new CreateSessionService();

    const result = await createSessionService.execute({
      username,
      password
    });

    return response.status(201).json(result);
  }
}