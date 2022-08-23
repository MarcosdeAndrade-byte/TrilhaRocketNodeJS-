/* eslint-disable prettier/prettier */
import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreatedCategoryController {

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        const createCategoryUserCase = container.resolve(CreateCategoryUseCase)

        createCategoryUserCase.execute({ name, description});

        return response.status(201).send();
    }
}

export { CreatedCategoryController };
