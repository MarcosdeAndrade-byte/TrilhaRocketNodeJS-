import { Category } from '../../entities/Category';
import { CategoriesRepositoryInMemory } from '../../in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory,
        );
    });

    it('should be able to create a new category', async () => {
        // Criamos uma categoria e descrição (A classe Category gera um Id automaticamente)
        const category = {
            name: 'Category Test',
            description: 'Category description Test',
        };

        // Passamos os dados para o banco de dados em memória
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        // Utilizamos o método findByName para realizar a busca pelo nome
        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name,
        );

        expect(categoryCreated).toHaveProperty('id');
    });
});
