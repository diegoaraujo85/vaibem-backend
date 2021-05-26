import { User } from '@schemas/User';

import ICreateUserDTO from './dtos/ICreateUserDTO';

export default interface IUsersRepository {

  create(data: ICreateUserDTO): Promise<User>;

}