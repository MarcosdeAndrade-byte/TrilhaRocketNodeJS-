import { Category } from '../infra/typeorm/entities/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../repositories/ICategoriesRepository';

// Criamos um banco de dados em memória para poder utilizar os testes()
class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = await this.categories.find(
            category => category.name === name,
        );
        return category;
    }

    async list(): Promise<Category[]> {
        const Allcategorys = await this.categories;
        return Allcategorys;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
        });

        this.categories.push(category);
    }
}

export { CategoriesRepositoryInMemory };
