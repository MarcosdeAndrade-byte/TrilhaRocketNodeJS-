/* eslint-disable prettier/prettier */
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// Para ter acesso aos dados teríamos que instanciar
interface IRequest {
    name: string;
    description: string;
}

// Classe para criar categorias
class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        // Verificamos se a categoria não existe através do nome
        // eslint-disable-next-line prettier/prettier
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            // Não utilizamos o response para não ficar dependente do express
            throw new Error('Category Already exists!');
        }

        // Caso não exista,criamos a categoria no repositório
        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
