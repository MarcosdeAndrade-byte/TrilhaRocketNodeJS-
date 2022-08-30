import { User } from './entities/User';

interface ICreateUserDTO {
    name: string;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    driver_license: string;
}

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
