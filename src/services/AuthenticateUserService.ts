import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '@config/auth';
import { User } from '@schemas/User';
import { AppError } from '@shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: {
        email
      }
    });


    if (!user) {
      throw new AppError('Identificação ou senha incorreto.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Identificação ou senha incorreto.', 401);
    }

    // se chegou até aqui o usuário está autenticado

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      // subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
