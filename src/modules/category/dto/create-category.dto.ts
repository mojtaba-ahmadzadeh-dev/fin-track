import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Allow } from "class-validator"; // یا Expose

export class CreateCategoryDto {
  @ApiProperty()
  @Allow()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiPropertyOptional({ nullable: true })
  @Allow()
  @IsOptional()
  @IsString()
  slug?: string;
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
   @IsOptional()
  image?: any;
  @ApiProperty({ type: "boolean" })
  @Allow()
  @IsBoolean()
  show: boolean;
  @ApiPropertyOptional({ nullable: true })
  @Allow()
  @IsOptional()
  @IsNumber()
  parentId?: number;
}