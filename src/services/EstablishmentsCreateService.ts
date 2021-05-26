import { getMongoRepository } from 'typeorm';

import ICreateEstablishmentDTO from '@repositories/dtos/ICreateEstablishmentDTO';
import { Establishment } from '@schemas/Establishment';

export default class CompaniesCreateService {
  async execute({
    name,
    city,
    state,
  }: ICreateEstablishmentDTO): Promise<Establishment> {
    const establishmentsRepository = getMongoRepository(Establishment);

    const establishment = establishmentsRepository.create({
      name,
      city,
      state,
    });

    await establishmentsRepository.save(establishment);

    return establishment;
  }
}