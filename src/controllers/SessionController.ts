import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import AuthenticateUserService from '@services/AuthenticateUserService';
import { AppError } from '@shared/errors/AppError';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      email,
      password,
    } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
