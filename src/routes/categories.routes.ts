/* eslint-disable prettier/prettier */
import { Router } from 'express';
import multer from 'multer';

import { CreatedCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/ImportCategoryUseCase/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreatedCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

// Modificamos nossa rota para atender ao princípio SOLID de responsabilidade única (Nossa rota é responsável apenas por servir os dados)
categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
    '/import',
    upload.single('file'),
    importCategoryController.handle,
);

export { categoriesRoutes };
