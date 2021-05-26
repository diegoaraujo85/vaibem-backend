import { EntityRepository, getMongoRepository, MongoRepository } from 'typeorm';

import { Establishment } from '@schemas/Establishment';

import ICreateEstablishmentDTO from './dtos/ICreateEstablishmentDTO';
import IEstablishmentsRepository from './IEstablishmentsRepository';

@EntityRepository()
export class EstablishmentsRepository implements IEstablishmentsRepository {
  private ormRepository: MongoRepository<Establishment>;

  constructor() {
    this.ormRepository = getMongoRepository(Establishment)
  }

  async create({
    name,
    city,
    state,
  }: ICreateEstablishmentDTO): Promise<Establishment> {


    const establishment = this.ormRepository.create({
      name,
      city,
      state,
    });

    await this.ormRepository.save(establishment);

    return establishment;
  }
}