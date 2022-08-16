/* eslint-disable prettier/prettier */
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationService';

const specificationsRepository = new SpecificationsRepository();

// eslint-disable-next-line prettier/prettier
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);

// eslint-disable-next-line prettier/prettier
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };
