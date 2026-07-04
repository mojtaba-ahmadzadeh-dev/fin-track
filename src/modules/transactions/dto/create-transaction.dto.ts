import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsEnum, IsString, IsOptional, IsDateString, Min, IsInt } from "class-validator";
import { TransactionType } from "src/common/enum/transaction-type.enum";

export class CreateTransactionDto {
  @ApiProperty({ example: 2500000 })
  @IsNumber()
  @Min(0)
  amount: number;
  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  @IsEnum(TransactionType)
  type: TransactionType;
  @ApiProperty({ example: 5 })
  @IsInt()
  accountId: number;
  @ApiProperty({ example: 12, required: false })
  @IsInt()
  @IsOptional()
  categoryId?: number;
  @ApiProperty({ example: "خرید مواد غذایی از سوپرمارکت", required: false })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({ example: "2026-07-03", required: false })
  @IsDateString()
  @IsOptional()
  date?: string;
  @ApiProperty({ example: "INV-98765", required: false })
  @IsString()
  @IsOptional()
  reference?: string;
  @ApiProperty({ default: false, required: false })
  @IsOptional()
  isRecurring?: boolean = false;
}