import { Request, Response } from 'express';
import { getCustomRepository, getMongoRepository } from 'typeorm';

import { EstablishmentsRepository } from '@repositories/EstablishmentsRepository';
import { Establishment } from '@schemas/Establishment';
import EstablishmentsCreateService from '@services/EstablishmentsCreateService';
import EstablishmentsUpdateService from '@services/EstablishmentsUpdateService';
import { AppError } from '@shared/errors/AppError';

export default class EstablishmentsController {

  async index(request: Request, response: Response): Promise<Response> {
    const establishmentsRepository = getMongoRepository(Establishment);

    const establishments = await establishmentsRepository.find();

    return response.json(establishments);
  }

  async create(request: Request, response: Response): Promise<Response> {

    const {
      name,
      city,
      state,
    } = request.body;

    const establishmentsCreateService = new EstablishmentsCreateService();

    try {
      const establishment = await establishmentsCreateService.execute({
        name,
        city,
        state,
      });

      return response.json(establishment);
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }

  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, city, state } = request.body;

    const establishmentsUpdateService = new EstablishmentsUpdateService();

    try {
      const establishment = await establishmentsUpdateService.execute({
        establishmentId: request.params.id,
        name,
        city,
        state,
      });

      return response.json(establishment);
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const establishment = await getMongoRepository(Establishment).findOne(id);

    if (!establishment) {
      throw new AppError('Estabelecimento não encontrado');
    }

    return response.json(establishment);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const establishment = await getMongoRepository(Establishment).findOne(id);

    if (!establishment) {
      throw new AppError('Estabelecimento não encontrado');
    }

    await getMongoRepository(Establishment).delete(id);
    // console.log('Successfully deleted');

    return response.status(200).json({ message: 'Deletado com Sucesso' });
  }

  async getEstablishmentsByLocation(request: Request, response: Response): Promise<Response> {
    const { city, state } = request.query;

    console.log(request.query)

    const establishment = await getMongoRepository(Establishment).find({
      where: {
        city: city ? city : ' like("%%")',
        state: state ? state : ' like("%%")',
      }
    });
    console.log(establishment);

    return response.json(establishment);
  }
}
