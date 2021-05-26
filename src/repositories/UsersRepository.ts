import { getMongoRepository, MongoRepository } from 'typeorm';

import { User } from '@schemas/User';

import ICreateUserDTO from './dtos/ICreateUserDTO';
import IUsersRepository from './IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<User>;

  constructor() {
    this.ormRepository = getMongoRepository(User)
  }

  async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {


    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

}
