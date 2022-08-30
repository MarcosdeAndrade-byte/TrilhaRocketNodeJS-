/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';

const router = Router();

// Rotas da aplicação (Relacionamos as rotas com as respectivas entidades)
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authenticateRoutes);

// Exportar rotas da aplicação para o arquivo principal ( Server )
export { router };
