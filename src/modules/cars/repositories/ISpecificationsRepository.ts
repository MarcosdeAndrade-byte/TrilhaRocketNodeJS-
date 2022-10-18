/* eslint-disable prettier/prettier */
import { Specification } from '../infra/typeorm/entities/Specification';
// Interface criada para descrever o que as classes derivadas devem implementar
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}
interface ISpecificationsRepository {
    create({ description, name }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
