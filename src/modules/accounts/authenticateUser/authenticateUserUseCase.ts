import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Irequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
    ) {}

    async execute({ email, password }: Irequest): Promise<IResponse> {
        // Busca se usuário existe
        const user = await this.userRepository.findByEmail(email);

        // Se não existir lança um erro
        if (!user) {
            throw new AppError('Email or password incorrect');
        }

        // Senha correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect');
        }

        const token = sign({}, 'c10ca89e863d535377d8937920e35e5a', {
            subject: user.id,
            expiresIn: '1d',
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };
        // Gerar Json
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
