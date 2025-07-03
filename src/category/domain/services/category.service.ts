import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategoryDto } from '../dtos/createCategory.dto';
import { Category } from '../interfaces/category.interface';
import { UpdateCategoryDto } from '../dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(category: CreateCategoryDto): Promise<Category> {
    const { name } = category;

    const categoryExists = await this.findBy({ name });

    if (categoryExists) {
      throw new BadRequestException('A category with this name already exists');
    }

    return await this.categoryRepository.create(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findBy({
    id,
    name,
  }: {
    id?: string;
    name?: string;
  }): Promise<Category | null> {
    if (id) {
      return await this.categoryRepository.findById(id);
    }

    if (name) {
      return await this.categoryRepository.findByName(name);
    }

    return null;
  }

  async update(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<Category | null> {
    const categoryFound = await this.findBy({ id });

    if (!categoryFound) {
      throw new NotFoundException('Category not found');
    }

    if (category.name) {
      const categoryWithSameName = await this.findBy({ name: category.name });
      if (categoryWithSameName) {
        throw new BadRequestException(
          'A category with this name already exists',
        );
      }
    }

    return await this.categoryRepository.update(id, category);
  }

  async delete(id: string): Promise<void> {
    const categoryFound = await this.findBy({ id });

    if (!categoryFound) {
      throw new NotFoundException('Category not found');
    }

    return await this.categoryRepository.delete(id);
  }
}
