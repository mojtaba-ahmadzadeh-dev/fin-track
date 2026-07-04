import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionsTable1733100575078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 18,
            scale: 4,
            isNullable: false,
          },
          {
            name: "type",
            type: "enum",
            enum: ["income", "expense", "transfer"],
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            length: "500",
            isNullable: true,
          },
          {
            name: "date",
            type: "date",
            isNullable: false,
          },
          {
            name: "isRecurring",
            type: "boolean",
            default: false,
            isNullable: false,
          },
          {
            name: "reference",
            type: "varchar",
            length: "100",
            isNullable: true,
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
            name: "accountId",
            type: "int",
            isNullable: false,
          },
          {
            name: "categoryId",
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
            columnNames: ["userId"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["accountId"],
            referencedTableName: "accounts", 
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["categoryId"],
            referencedTableName: "category",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
    await queryRunner.query(`DROP TYPE IF EXISTS "transaction_type_enum"`);
  }
}
