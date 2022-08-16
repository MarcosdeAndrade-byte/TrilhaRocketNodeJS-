/* eslint-disable prettier/prettier */
import { Response, Request } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreatedCategoryController {
    constructor(private createCategoryUserCase: CreateCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        // eslint-disable-next-line prettier/prettier
        this.createCategoryUserCase.execute({ name, description});
        return response.status(201).send();
    }
}

export { CreatedCategoryController };
