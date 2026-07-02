import { IsNotEmpty, IsString, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({
    example: '09123456789',
    description: 'شماره موبایل با فرمت 09xxxxxxxxx',
  })
  @IsString()
  @IsNotEmpty({ message: 'شماره موبایل الزامی است' })
  @IsPhoneNumber('IR', { message: 'شماره موبایل وارد شده معتبر نیست' })
  phone: string;
  @ApiProperty({ enum: ['sms'], default: 'sms' })
  @IsOptional()
  method?: 'sms' = 'sms';
}