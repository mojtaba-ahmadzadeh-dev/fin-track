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

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { title, slug, description, isActive, parentId } = createCategoryDto;
    const exist = await this.categoryRepository.findOne({
      where: { slug },
    });

    if (exist) {
      throw new BadRequestException("Slug already exists");
    }

    const category = await this.categoryRepository.create({
      title,
      slug,
      description,
      isActive: isActive ?? true,
    });

    if (parentId) {
      const parent = await this.categoryRepository.findOne({
        where: { id: parentId },
      });

      if (!parent) {
        throw new NotFoundException("Parent category not found");
      }

      category.parent = parent;
    }

    return await this.categoryRepository.save(category);
  }
}
