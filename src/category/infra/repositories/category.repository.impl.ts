import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';
import { Category } from 'src/category/domain/interfaces/category.interface';
import { CreateCategoryDto } from 'src/category/domain/dtos/createCategory.dto';
import { UpdateCategoryDto } from 'src/category/domain/dtos/updateCategory.dto';
import { Model } from 'mongoose';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryModel: Model<Category>) {}

  async create(category: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(category);
    return await createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<Category | null> {
    return await this.categoryModel.findById(id).exec();
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.categoryModel.findOne({ name }).exec();
  }

  async update(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<Category | null> {
    return await this.categoryModel
      .findByIdAndUpdate(id, category, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id);
  }
}
