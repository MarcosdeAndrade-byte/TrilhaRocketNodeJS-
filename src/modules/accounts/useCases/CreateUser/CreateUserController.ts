/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, username, email, isAdmin,driver_license, password } = request.body;

        // injeção de dependência com Tsyringe
        const createUserCase = container.resolve(CreateUserUseCase);

        await createUserCase.execute({
            name,
            username,
            email,
            isAdmin,
            driver_license,
            password,
        });

        return response.status(201).send()
    }
}

export { CreateUserController }