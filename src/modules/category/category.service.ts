import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";
import { MulterFile } from "src/common/utils/multer.util";
import { generateSlug } from "src/common/utils/slug.util";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import {
  paginationGenerator,
  paginationSolver,
} from "src/common/utils/pagination.util";
import path from "path";
import fs from "fs";
import { CategoryMessage } from "src/common/enum/message.enum";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, file?: MulterFile) {
    const { title, slug, parentId, show = true } = createCategoryDto;

    if (parentId) {
      const parent = await this.categoryRepository.findOneBy({ id: parentId });
      if (!parent) {
        throw new NotFoundException(CategoryMessage.PARENT_NOT_FOUND);
      }
    }

    let finalSlug = slug;
    if (!finalSlug) {
      finalSlug = generateSlug(title);
    }
    const existingCategory = await this.categoryRepository.findOneBy({
      slug: finalSlug,
    });
    if (existingCategory) {
      throw new BadRequestException(CategoryMessage.SLUG_ALREADY_EXISTS);
    }

    let imagePath: string | null = null;
    let imageKey: string | null = null;
    if (file) {
      imagePath = `/uploads/categories/${file.filename}`;
      imageKey = file.filename;
    }

    const newCategory = this.categoryRepository.create({
      title,
      slug: finalSlug,
      image: imagePath,
      imageKey,
      show,
      parentId: parentId || null,
    });

    await this.categoryRepository.save(newCategory);

    return {
      message: CategoryMessage.CREATED,
      category: newCategory,
    };
  }

  async findOneBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ["parent", "children"],
    });
    if (!category) {
      throw new NotFoundException(CategoryMessage.NOT_FOUND_BY_ID);
    }
    return category;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page, skip } = paginationSolver(paginationDto);
    const [categories, count] = await this.categoryRepository.findAndCount({
      where: {},
      skip,
      take: limit,
    });
    return {
      pagination: paginationGenerator(count, page, limit),
      categories,
    };
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`دسته‌بندی با شناسه ${id} یافت نشد`);
    }

    if (category.image) {
      const imagePath = path.join(
        process.cwd(),
        "uploads",
        "categories",
        category.image,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await this.categoryRepository.delete(id);
    return {
      message: CategoryMessage.DELETED,
    };
  }
}
