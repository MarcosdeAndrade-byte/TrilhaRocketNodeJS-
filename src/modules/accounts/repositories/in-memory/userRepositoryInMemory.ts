import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
    user: User[] = [];

    async create({
        driver_license,
        email,
        isAdmin,
        name,
        password,
        username,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();
        // eslint-disable-next-line prettier/prettier
        Object.assign(user, {
            driver_license,
            email,
            isAdmin,
            name,
            password,
            username,
            avatar,
            id,
        });

        this.user.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.user.find(user => user.email === email);
    }

    async findById(user_id: string): Promise<User> {
        return this.user.find(user => user.id === user_id);
    }
}

export { UsersRepositoryInMemory };
