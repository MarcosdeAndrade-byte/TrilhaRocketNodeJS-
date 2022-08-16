/* eslint-disable prettier/prettier */
import { Specification } from '../entities/Specification';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService{
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  async createSpecification({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists.');
    }
    await this.specificationsRepository.create({
      name,
      description,
    });
  }

    /*
    async listCategories(): Promise<Specification[]> {
    // eslint-disable-next-line no-return-await
    return await this.specificationsRepository.list();
    }
    */
}