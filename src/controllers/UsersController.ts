import { Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';

import { User } from '@schemas/User';
import UsersCreateService from '@services/UsersCreateService';
import UsersUpdateService from '@services/UsersUpdateService';
import { AppError } from '@shared/errors/AppError';

export default class UsersController {

  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = getMongoRepository(User);

    const users = await usersRepository.find();

    return response.json(users);
  }

  async create(request: Request, response: Response): Promise<Response> {

    const {
      name,
      email,
      password,
    } = request.body;

    const userCreateService = new UsersCreateService();

    try {
      const user = await userCreateService.execute({
        name,
        email,
        password,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }

  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersUpdateService = new UsersUpdateService();

    const user = await usersUpdateService.execute({
      userId: request.params.id,
      name,
      email,
      password
    });

    return response.json(user);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = await getMongoRepository(User).findOne(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user = await getMongoRepository(User).findOne(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    await getMongoRepository(User).delete(id);
    return response.status(200).json({ message: 'Deletado com Sucesso' });
  }
}
