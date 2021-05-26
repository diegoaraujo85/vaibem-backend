import { getMongoRepository } from 'typeorm';

import { Establishment } from '@schemas/Establishment';
import { AppError } from '@shared/errors/AppError';

interface Request {
  establishmentId: string;
  name: string;
  city: string;
  state: string;
}

export default class CompaniesUpdateService {
  async execute({
    establishmentId,
    name,
    city,
    state,
  }: Request): Promise<Establishment> {
    const establishmentsRepository = getMongoRepository(Establishment);

    const establishment = await establishmentsRepository.findOne(establishmentId);

    if (!establishment) {
      throw new AppError('Empresa não encontrada.');
    }

    const establishment_updated = {
      name,
      city,
      state,
    };

    establishmentsRepository.merge(establishment, establishment_updated);

    const result = await establishmentsRepository.save(establishment);

    return result;
  }
}