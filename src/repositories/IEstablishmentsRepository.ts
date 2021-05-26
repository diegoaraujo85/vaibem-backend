import { Establishment } from '@schemas/Establishment';

import ICreateEstablishmentDTO from './dtos/ICreateEstablishmentDTO';

export default interface IEstablishmentsRepository {

  create(data: ICreateEstablishmentDTO): Promise<Establishment>;

}