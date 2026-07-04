import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { AuthDecorator } from "src/common/decorator/auth.decorator";
import { ApiTags } from "@nestjs/swagger";
import { CanAccess } from "src/common/decorator/role.decorator";
import { Roles } from "src/common/enum/role.enum";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { Pagination } from "src/common/decorator/pagination.decorator";

@Controller("transactions")
@AuthDecorator()
@ApiTags("Transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  @Pagination()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.transactionsService.findAll(paginationDto);
  }

  @Get(":id")
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Delete(":id")
  @CanAccess(Roles.Admin, Roles.SuperAdmin, Roles.User)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.transactionsService.remove(id);
  }
}
