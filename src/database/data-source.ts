/* eslint-disable prettier/prettier */
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '../modules/accounts/repositories/entities/User';
import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';
import { CreateSpecification1649000056992 } from './migrations/1649000056992-CreateSpecification';
import { CreateCategories1658090323925 } from './migrations/1658090323925-CreateCategories';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'docker',
    password: '1234',
    database: 'rentx',
    synchronize: true,
    logging: true,
    entities: [Category, Specification, User],
    migrations: ['./src/database/migrations/*.ts'],
});

AppDataSource.initialize()
    .then(async () => {
        console.log('Initializing the database...');
    })
    .catch(err => console.log(err));
