/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specification.routes';

const router = Router();

// Rotas da aplicação (Relacionamos as rotas com as respectivas entidades)
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

// Exportar rotas da aplicação para o arquivo principal ( Server )
export { router };
