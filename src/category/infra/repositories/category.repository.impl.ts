import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/category/domain/repositories/category.repository';
import { Category } from 'src/category/domain/interfaces/category.interface';
import { CreateCategoryDTO } from 'src/category/domain/dtos/createCategory.dto';
import { UpdateCategoryDTO } from 'src/category/domain/dtos/updateCategory.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(category: CreateCategoryDTO): Promise<Category> {
    const createdCategory = new this.categoryModel(category);
    return await createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().populate('players').exec();
  }

  async findById(id: string): Promise<Category | null> {
    return await this.categoryModel.findById(id).populate('players').exec();
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.categoryModel
      .findOne({ name })
      .populate('players')
      .exec();
  }

  async update(
    id: string,
    category: UpdateCategoryDTO,
  ): Promise<Category | null> {
    return await this.categoryModel
      .findByIdAndUpdate(id, category, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id);
  }

  async updateCategoryPlayers(id: string, playerId: string): Promise<void> {
    await this.categoryModel.findByIdAndUpdate(id, {
      $push: { players: playerId },
    });
  }

  async isPlayerInCategory(
    categoryId: string,
    playerId: string,
  ): Promise<boolean> {
    const category = await this.categoryModel
      .findOne({
        _id: categoryId,
        players: playerId,
      })
      .exec();
    return !!category;
  }
}
