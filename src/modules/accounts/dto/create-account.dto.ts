import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { AccountType } from "src/common/enum/account-type.enum";

export class CreateAccountDto {
  @ApiProperty({
    description: "نام حساب",
    example: "حساب بانک ملی",
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: "نوع حساب",
    enum: AccountType,
    example: AccountType.BANK,
  })
  @IsEnum(AccountType)
  @IsOptional()
  type?: AccountType = AccountType.WALLET;

  @ApiProperty({
    description: "واحد پول",
    example: "IRR",
    default: "IRR",
  })
  @IsString()
  @MaxLength(10)
  @IsOptional()
  currency?: string = "IRR";

  @ApiProperty({
    description: "موجودی اولیه",
    example: 5000000,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  initialBalance?: number = 0;

  @ApiProperty({
    description: "آیکون حساب (اختیاری)",
    example: "🏦",
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({
    description: "رنگ حساب برای نمایش",
    example: "#4CAF50",
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    description: "توضیحات حساب",
    example: "حساب اصلی برای دریافت حقوق",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "آیا این حساب پیش‌فرض باشد؟",
    example: true,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean = false;
}