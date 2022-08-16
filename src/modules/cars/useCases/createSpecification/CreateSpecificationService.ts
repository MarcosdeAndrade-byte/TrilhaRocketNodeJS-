/* eslint-disable prettier/prettier */
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationsRepository) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification Already exists!');
        }

        await this.specificationRepository.create({name,description});
    }
}

export { CreateSpecificationUseCase };