import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  title: string;
  @IsString()
  @ApiProperty()
  slug: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty()
  @Transform(({ value }) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  })
  @IsOptional()
  isActive?: boolean;
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  parentId?: number;
}
