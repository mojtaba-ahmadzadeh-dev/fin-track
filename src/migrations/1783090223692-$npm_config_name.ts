import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccountsTable1733090223692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "accounts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: ["bank", "wallet", "cash", "credit_card", "savings", "investment"],
                        default: "'wallet'",
                        isNullable: false,
                    },
                    {
                        name: "currency",
                        type: "varchar",
                        length: "10",
                        default: "'IRR'",
                        isNullable: false,
                    },
                    {
                        name: "balance",
                        type: "decimal",
                        precision: 18,
                        scale: 4,
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: "initialBalance",
                        type: "decimal",
                        precision: 18,
                        scale: 4,
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: "icon",
                        type: "varchar",
                        length: "50",
                        isNullable: true,
                    },
                    {
                        name: "color",
                        type: "varchar",
                        length: "50",
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "isDefault",
                        type: "boolean",
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: "isActive",
                        type: "boolean",
                        default: true,
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "int",
                        isNullable: false,
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
                        columnNames: ["userId"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("accounts");
        await queryRunner.query(`DROP TYPE IF EXISTS "account_type_enum"`);
    }
}