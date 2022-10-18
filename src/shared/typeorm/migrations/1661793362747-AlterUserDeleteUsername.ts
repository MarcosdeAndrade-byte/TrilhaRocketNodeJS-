import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserDeleteUsername1661793362747
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criamos nossa tabela
        await queryRunner.dropColumn('users', 'username');
    }

    // Se algo der errado excluímos a tabela
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({ name: 'username', type: 'varchar' }),
        );
    }
}
