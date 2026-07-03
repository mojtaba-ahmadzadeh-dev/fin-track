import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@Controller("category")
@AuthDecorator()
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @CanAccess(Roles.Admin, Roles.SuperAdmin)
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get("slug/:slug")
  @SkipAuth()
  @ApiConsumes(SwaggerConsumes.UrlEncoded)
  findBySlug(@Param("slug") slug: string) {
    return this.categoryService.findBySlug(slug);
  }
}
