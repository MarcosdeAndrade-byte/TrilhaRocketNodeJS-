import { AppError } from '../../../../errors/AppError';
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

    it('should not be able to create a new category with exists', async () => {
        expect(async () => {
            // Toda essa estrutura gera um erro (Já que está duplicada no banco)
            const category = {
                name: 'Category Test',
                description: 'Category description Test',
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
            // quando for rejeitado o erro deve ser uma instância da classe AppError
        }).rejects.toBeInstanceOf(AppError);
    });
});

export { CategoriesRepositoryInMemory };
