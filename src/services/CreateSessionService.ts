import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppError } from "../error/AppError";
import { User } from '../models/User';
import { UsersRepository } from "../repositories"

type RequestCreateSession = {
  username: string;
  password: string;
}

type ResponseCreateSession = {
  token: string;
  user: Pick<User, 'username'>;
}

const JWT_SECRET = process.env.JWT_SECRET;

export class CreateSessionService {
  async execute({ username, password }: RequestCreateSession): Promise<ResponseCreateSession> {
    const user = await UsersRepository().findOne({ username });

    if (!user) {
      throw new AppError('Username or password incorrect.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Username or password incorrect.');
    }

    const token = sign({}, JWT_SECRET, {
      subject: user.id,
    });

    return {
      token,
      user: {
        username: user.username,
      },
    }
  }
}