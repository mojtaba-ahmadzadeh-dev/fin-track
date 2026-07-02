import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthDecorator } from "src/common/decorator/auth.decorator";
import { CanAccess } from "src/common/decorator/role.decorator";
import { Roles } from "src/common/enum/role.enum";
import type { Request } from "express";
import { UpdateRoleDto } from "./dto/user.dto";

@Controller("user")
@ApiTags("User")
@AuthDecorator()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CanAccess(Roles.Admin, Roles.SuperAdmin)
  async findAll() {
    return this.userService.findAll();
  }

  @Get("/me")
  @CanAccess(Roles.User, Roles.Admin, Roles.SuperAdmin)
  userMe() {
    return this.userService.userMe();
  }

  @Patch("/:id/role")
  @CanAccess(Roles.Admin, Roles.SuperAdmin)
  async changeRole(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.userService.changeUserRole(id, updateRoleDto.role);
  }
}
