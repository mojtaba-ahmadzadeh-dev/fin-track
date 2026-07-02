import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserAndOtpTables1732982151358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "email", type: "varchar", length: "255", isUnique: true, isNullable: true },
                    { name: "password", type: "varchar", length: "255", isNullable: true },
                    { name: "firstName", type: "varchar", length: "100", isNullable: true },
                    { name: "lastName", type: "varchar", length: "100", isNullable: true },
                    { name: "phone", type: "varchar", length: "20", isUnique: true},
                    { name: "isActive", type: "boolean", default: true },
                    { name: "isEmailVerified", type: "boolean", default: false },
                    { name: "isPhoneVerified", type: "boolean", default: false },
                    { name: "otpId", type: "int", isNullable: true },
                    { name: "role", type: "enum", enum: ["user", "admin", "superadmin"], default: "'user'" },
                    { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
                ],
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: "otp",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "code", type: "varchar", length: "6" },
                    { name: "expiresIn", type: "timestamp" },
                    { name: "userId", type: "int" },
                    { name: "method", type: "varchar", length: "20", isNullable: true },
                    { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "user",
            new TableForeignKey({
                name: "FK_user_otpId",     
                columnNames: ["otpId"],
                referencedColumnNames: ["id"],
                referencedTableName: "otp",
                onDelete: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "otp",
            new TableForeignKey({
                name: "FK_otp_userId",           // ← نام مشخص
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("user", "FK_user_otpId");
        await queryRunner.dropForeignKey("otp", "FK_otp_userId");

        await queryRunner.dropTable("otp");
        await queryRunner.dropTable("user");
    }
}