import { getMongoRepository } from 'typeorm';

import ICreateUserDTO from '@repositories/dtos/ICreateUserDTO';
import { User } from '@schemas/User';
import { AppError } from '@shared/errors/AppError';

import BCryptHashProvider from '../providers/HashProvider/BCryptHashProvider';

export default class UsersCreateService {
  async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const usersRepository = getMongoRepository(User);

    const userExists = await usersRepository.find({
      where: {
        email
      }
    });

    console.log(userExists)

    if (userExists.length) {
      throw new AppError('Usuário já existe');
    }

    const hashProvider = new BCryptHashProvider();

    const hashedPassword = await hashProvider.generateHash(password);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}