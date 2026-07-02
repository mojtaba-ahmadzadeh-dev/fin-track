import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsOptional,
  Length,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendOtpDto {
  @ApiProperty({
    example: "09123456789",
    description: "شماره موبایل با فرمت 09xxxxxxxxx",
  })
  @IsString()
  @IsNotEmpty({ message: "شماره موبایل الزامی است" })
  @IsPhoneNumber("IR", { message: "شماره موبایل وارد شده معتبر نیست" })
  phone: string;
  @ApiProperty({ enum: ["sms"], default: "sms" })
  @IsOptional()
  method?: "sms" = "sms";
}

export class VerifyOtpDto {
  @ApiProperty({ example: "09123456789" })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("IR")
  phone: string;
  @ApiProperty({ example: "123456" })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: "کد تأیید باید ۶ رقمی باشد" })
  code: string;
}
