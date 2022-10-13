import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        name,
        username,
        email,
        isAdmin,
        password,
        driver_license,
        id,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError('User already exists');
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            username,
            email,
            isAdmin,
            password: passwordHash,
            driver_license,
            id,
        });
    }
}

export { CreateUserUseCase };
