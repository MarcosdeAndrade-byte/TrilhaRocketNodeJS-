import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import UserRepository from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    // Padrão: Bearer <CÓDIGO>
    const authHeader = request.headers.authorization;

    // Se o token de autenticação não for passada na rota geramos um erro
    if (!authHeader) {
        throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    // Retorna o Id do nosso usuário
    try {
        const { sub: user_id } = verify(
            token,
            'c10ca89e863d535377d8937920e35e5a',
        ) as IPayload;

        console.log(user_id);

        const usersRepository = new UserRepository();
        usersRepository.findById(user_id);
        next();
    } catch (error) {
        throw new AppError('Invalid token!', 401);
    }
}
