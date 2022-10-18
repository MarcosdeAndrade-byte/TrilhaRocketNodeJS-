import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../shared/typeorm/data-source';
import { ICreateUserDTO } from '../../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { User } from '../entities/User';

class UserRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findById(user_id: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                id: user_id,
            },
        });
        return user;
    }

    async create({
        name,
        username,
        email,
        isAdmin,
        driver_license,
        password,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            email,
            isAdmin,
            driver_license,
            password,
            avatar,
            id,
        });

        // Os atributos são salvos no banco de dados
        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email });
        return user;
    }
}

export default UserRepository;
