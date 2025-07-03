import { CreateCategoryDTO } from '../dtos/createCategory.dto';
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto';
import { Category } from '../interfaces/category.interface';

export interface CategoryRepository {
  create(category: CreateCategoryDTO): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  isPlayerInCategory(id: string, playerId: string): Promise<boolean>;
  findByName(name: string): Promise<Category | null>;
  update(id: string, category: UpdateCategoryDTO): Promise<Category | null>;
  delete(id: string): Promise<void>;
  updateCategoryPlayers(id: string, playerId: string): Promise<void>;
}
