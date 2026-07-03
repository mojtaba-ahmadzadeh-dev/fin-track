import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  $npmConfigName1783067391383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "category",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "slug",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "imageKey",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "show",
                        type: "boolean",
                        isNullable: false,
                        default: true,
                    },
                    {
                        name: "parentId",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "deletedAt",
                        type: "datetime",
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["parentId"],
                        referencedTableName: "category",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("category");
    }
}