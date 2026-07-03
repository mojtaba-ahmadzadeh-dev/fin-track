import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthDecorator } from "src/common/decorator/auth.decorator";
import { CanAccess } from "src/common/decorator/role.decorator";
import { Roles } from "src/common/enum/role.enum";
import { SwaggerConsumes } from "src/common/enum/swagger-consumes.enum";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";

@Controller("accounts")
@AuthDecorator()
@ApiTags("Accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(":id")
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  @Get(":id/balance")
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  getBalance(@Param("id", ParseIntPipe) id: number) {
    return this.accountsService.getBalance(id);
  }

  @Delete(":id")
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.accountsService.remove(id);
  }

  @Patch(":id")
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountsService.update(id, updateAccountDto);
  }
}
