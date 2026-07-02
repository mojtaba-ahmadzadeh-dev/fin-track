// user.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { Roles } from "src/common/enum/role.enum";

export class UpdateRoleDto {
  @ApiProperty({ enum: Roles, description: 'New role for the user' })
  @IsEnum(Roles)
  role: Roles;
}