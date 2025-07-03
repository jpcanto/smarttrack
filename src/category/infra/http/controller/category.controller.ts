import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/category/domain/dtos/createCategory.dto';
import { Category } from 'src/category/domain/interfaces/category.interface';
import { CategoryService } from 'src/category/domain/services/category.service';
import { UpdateCategoryDto } from 'src/category/domain/dtos/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() category: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(category);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category | null> {
    return await this.categoryService.findBy({ id });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category | null> {
    return await this.categoryService.update(id, category);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.categoryService.delete(id);
  }
}
