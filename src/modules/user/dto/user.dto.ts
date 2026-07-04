import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Roles } from "src/common/enum/role.enum";

export class UpdateRoleDto {
  @ApiProperty({ enum: Roles, description: 'New role for the user' })
  @IsEnum(Roles)
  role: Roles;
}

export class UpdateProfileDto {
  @ApiProperty({ 
    required: false, 
    description: "نام کاربر", 
    example: "احمد" 
  })
  @IsOptional()
  @IsString({ message: "نام باید رشته باشد" })
  @MinLength(2, { message: "نام باید حداقل ۲ کاراکتر باشد" })
  @MaxLength(100, { message: "نام نباید بیشتر از ۱۰۰ کاراکتر باشد" })
  firstName?: string;

  @ApiProperty({ 
    required: false, 
    description: "نام خانوادگی کاربر", 
    example: "محمدی" 
  })
  @IsOptional()
  @IsString({ message: "نام خانوادگی باید رشته باشد" })
  @MinLength(2, { message: "نام خانوادگی باید حداقل ۲ کاراکتر باشد" })
  @MaxLength(100, { message: "نام خانوادگی نباید بیشتر از ۱۰۰ کاراکتر باشد" })
  lastName?: string;

  @ApiProperty({ 
    required: false, 
    description: "ایمیل کاربر", 
    example: "ahmad@example.com" 
  })
  @IsOptional()
  @IsEmail({}, { message: "فرمت ایمیل نامعتبر است" })
  email?: string;

  @ApiProperty({ 
    required: false, 
    description: "رمز عبور جدید", 
    example: "newPassword123" 
  })
  @IsOptional()
  @IsString({ message: "رمز عبور باید رشته باشد" })
  @MinLength(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" })
  password?: string;
}