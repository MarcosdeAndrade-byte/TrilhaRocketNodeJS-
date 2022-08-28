import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../database';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UserRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    // Criar um usuário no banco de dados
    async create({
        // Atributos
        name,
        username,
        email,
        isAdmin,
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            email,
            isAdmin,
            driver_license,
            password,
        });

        // Os atributos são salvos no banco de dados
        await this.repository.save(user);
    }
}

export default UserRepository;
