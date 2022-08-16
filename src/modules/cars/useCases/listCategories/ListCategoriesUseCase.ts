/* eslint-disable prettier/prettier */
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    // Método criado para retornar a lista de categorias
    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();
        return categories;
    }
}

export { ListCategoriesUseCase };
