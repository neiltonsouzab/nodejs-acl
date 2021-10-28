import { hash } from 'bcryptjs'
import { classToClass } from 'class-transformer';

import { AppError } from '../error/AppError';
import { User } from "../models/User";
import { UsersRepository } from "../repositories";

type RequestCreateUser = Pick<User, 'username' | 'password'>;

export class CreateUserService {

  async execute({ username, password }: RequestCreateUser): Promise<User> {
    const userAlreadyExists = await UsersRepository().findOne({ username });

    if (userAlreadyExists) {
      throw new AppError('User already exists.');
    }

    const passwordHash = await hash(password, 8);

    const user = UsersRepository().create({
      username,
      password: passwordHash,
    });

    await UsersRepository().save(user);

    return classToClass(user);
  }

}