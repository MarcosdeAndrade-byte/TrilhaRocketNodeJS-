/* eslint-disable prettier/prettier */
import { parse } from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        // Temos que colocar nosso código dentro de uma Promise para fazer com que o node espere o retorno da função
        return new Promise((resolve, reject) => {
            // Criamos uma stream
            const stream = fs.createReadStream(file.path);

            // Criamos a variável categories do tipo IImportCategory[] que recebe um array
            const categories: IImportCategory[] = [];

            // criamos um csv-parse que vai ler linha por linha do arquivo
            const parseFile = parse();

            // Passamos os dados da stream para variável parseFile
            stream.pipe(parseFile);

            // Método utilizado para inserir as categorias do arquivo CSV(O on é um método )
            parseFile.on('data', async line => {
                const [name, description] = line;
                categories.push({
                      name,
                      description,
                   });
            }).on('end', () => {
                // Método para retirar o arquivo da pasta depois que foi lido e suas informações foram adicionadas no repositório principal
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on('error', (err) => {
                reject(err);
            });
        });
    }

    // Função para salvar categoria no banco de dados
    async execute(file: Express.Multer.File): Promise<void> {
        // Passamos o arquivo como argumento da função loadCategories (Responsável por retornar um array com as categorias do arquivo CSV)
        const categories = await this.loadCategories(file);
        
        // Vamos utilizar a função map para verificar se existe uma categoria repetida
        categories.map(async (category) => {

            // Desestruturação da variável categories
            const { name, description } = category;

            // Verifica se existe ou não
            const existCategory = this.categoriesRepository.findByName(name);

            // Se não existir,cria uma nova categoria no banco de dados
            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                })
            }
        })

    }
}

export { ImportCategoryUseCase };
