/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

// Para ter acesso aos dados teríamos que instanciar
interface IRequest {
    name: string;
    description: string;
}

// Classe para criar categorias
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        // Verificamos se a categoria não existe através do nome
        // eslint-disable-next-line prettier/prettier
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            // Não utilizamos o response para não ficar dependente do express
            throw new AppError('Category Already exists!');
        }

        // Caso não exista,criamos a categoria no repositório
        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
