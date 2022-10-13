import { User } from './entities/User';

interface ICreateUserDTO {
    name: string;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    driver_license: string;
    id: string;
}

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(user_id: string): Promise<User>;
}

export { IUsersRepository };
