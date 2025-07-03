import { CreateCategoryDto } from '../dtos/createCategory.dto';
import { UpdateCategoryDto } from '../dtos/updateCategory.dto';
import { Category } from '../interfaces/category.interface';

export interface CategoryRepository {
  create(category: CreateCategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  update(id: string, category: UpdateCategoryDto): Promise<Category | null>;
  delete(id: string): Promise<void>;
}
