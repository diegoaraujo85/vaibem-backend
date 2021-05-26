import { getMongoRepository } from 'typeorm';

import { User } from '@schemas/User';
import { AppError } from '@shared/errors/AppError';

interface Request {
  userId: string;
  name: string;
  email: string;
  password?: string;
}

export default class UsersUpdateService {
  async execute({
    userId,
    name,
    email,
    password,
  }: Request): Promise<User> {
    const usersRepository = getMongoRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('Usário não encontrado.');
    }

    const user_updated = {
      name,
      email,
      password,
    };

    usersRepository.merge(user, user_updated);

    const result = await usersRepository.save(user);


    return result;
  }
}