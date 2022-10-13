/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../repositories/in-memory/userRepositoryInMemory';
import { CreateUserUseCase } from '../useCases/CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    // Executa uma função antes que cada um dos testes neste arquivo seja executado.
    beforeEach(() => {
        userRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory,
        );
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '00123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
            username: '',
            isAdmin: false,
            id: '',
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', () => {
        // Quando você está escrevendo testes, muitas das vezes você precisa checar se
        // os valores satisfazem certas condições. expect lhe dá acesso a inúmeros
        // "matchers" que permitem validar diferentes coisas.
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
        // Como esperado o teste deve falhar
    });

    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            // Criamos uma instância do usuário
            const user: ICreateUserDTO = {
                driver_license: '00123',
                email: 'user@user.com',
                password: '1234',
                name: 'User Test Error',
                username: '',
                isAdmin: false,
                id: '',
            };

            // Criamos ele no banco de dados
            await createUserUseCase.execute(user);

            // Passamos um email válido para uma senha incorreta
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
