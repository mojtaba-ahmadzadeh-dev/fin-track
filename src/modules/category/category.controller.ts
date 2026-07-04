import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  ParseIntPipe,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/enum/swagger-consumes.enum";
import { AuthDecorator } from "src/common/decorator/auth.decorator";
import { CanAccess } from "src/common/decorator/role.decorator";
import { Roles } from "src/common/enum/role.enum";
import { SkipAuth } from "src/common/decorator/skip-auth.decorator";
import { Pagination } from "src/common/decorator/pagination.decorator";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import type { MulterFile } from "src/common/utils/multer.util";
import { UploadFile } from "src/common/interceptor/upload.interceptor";

@Controller("category")
@AuthDecorator()
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @CanAccess(Roles.Admin, Roles.SuperAdmin)
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UploadFile("image", "categories")
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file?: MulterFile,
  ) {
    return this.categoryService.create(createCategoryDto, file);
  }

  @Get(":slug")
  @SkipAuth()
  async findOneBySlug(@Param("slug") slug: string) {
    return this.categoryService.findOneBySlug(slug);
  }

  @Get()
  @SkipAuth()
  @Pagination()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.categoryService.findAll(paginationDto);
  }

  @Delete(":id")
  @CanAccess(Roles.Admin, Roles.SuperAdmin)
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
