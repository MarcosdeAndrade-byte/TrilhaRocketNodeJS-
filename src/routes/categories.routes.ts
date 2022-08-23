/* eslint-disable prettier/prettier */
import { Router } from 'express';
import multer from 'multer';

import { CreatedCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import importCategoryController from '../modules/cars/useCases/ImportCategoryUseCase';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreatedCategoryController()

// Modificamos nossa rota para atender ao princípio SOLID de responsabilidade única (Nossa rota é responsável apenas por servir os dados)
categoriesRoutes.post('/',createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController().handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { categoriesRoutes };
