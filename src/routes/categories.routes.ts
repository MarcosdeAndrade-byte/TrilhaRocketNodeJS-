/* eslint-disable prettier/prettier */
import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import importCategoryController from '../modules/cars/useCases/ImportCategoryUseCase';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

// Modificamos nossa rota para atender ao princípio SOLID de responsabilidade única (Nossa rota é responsável apenas por servir os dados)
categoriesRoutes.post('/', (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController().handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { categoriesRoutes };
