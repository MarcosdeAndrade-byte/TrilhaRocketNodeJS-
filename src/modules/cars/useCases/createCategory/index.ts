// /* eslint-disable prettier/prettier */
// import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
// import { CreatedCategoryController } from './CreateCategoryController';
// import { CreateCategoryUseCase } from './CreateCategoryUseCase';

// export default (): CreatedCategoryController => {
//     const categoriesRepository = new CategoriesRepository();

//     const createCategoryUserCase = new CreateCategoryUseCase(
//         categoriesRepository,
//     );

//     const createCategoryController = new CreatedCategoryController(
//         createCategoryUserCase,
//     );

//     return createCategoryController;
// };
