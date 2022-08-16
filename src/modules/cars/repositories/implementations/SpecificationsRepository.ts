/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database';
import { Specification } from '../../entities/Specification';
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        })
        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOneBy({name});
        return specification;
    }
}

export { SpecificationsRepository };