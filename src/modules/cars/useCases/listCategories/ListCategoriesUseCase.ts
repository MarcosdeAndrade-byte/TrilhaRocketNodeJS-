/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
    constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {}

    // Método criado para retornar a lista de categorias
    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();
        return categories;
    }
}

export { ListCategoriesUseCase };
