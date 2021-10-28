import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../repositories";

export function can(permissions: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const user = await UsersRepository().findOne(request.userId, {
      relations: ['permissions'],
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          roles: 'user.roles',
          permissions: 'roles.permissions'
        }
      }
    });

    if (!user) {
      return response.status(400).json({
        message: 'User not found.'
      });
    }

    const userPermissions = user.permissions;
    const userRolesPermissions = user.roles.flatMap(roles => roles.permissions);

    const isAuthorizedWithUserPermissions = userPermissions
      .map(permission => permission.name)
      .some(permission => permissions.includes(permission));

    const isAuthorizedWithUserRolesPermissions = userRolesPermissions
      .map(permission => permission.name)
      .some(permission => permissions.includes(permission));


    if (!isAuthorizedWithUserPermissions && !isAuthorizedWithUserRolesPermissions) {
      return response.status(401).end();
    }

    return next();
  }
}

export function is(roles: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const user = await UsersRepository().findOne(request.userId, {
      relations: ['roles']
    });

    if (!user) {
      return response.status(400).json({
        message: 'User not found.'
      });
    }

    const isAuthorized = user.roles
      .map(role => role.name)
      .some(role => roles.includes(role));

    if (!isAuthorized) {
      return response.status(401).end();
    }

    return next();
  }
}