import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategoryDTO } from '../dtos/createCategory.dto';
import { Category } from '../interfaces/category.interface';
import { UpdateCategoryDTO } from '../dtos/updateCategory.dto';
import { PlayerService } from 'src/player/domain/services/player.service';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
    private readonly playerService: PlayerService,
  ) {}

  async create(category: CreateCategoryDTO): Promise<Category> {
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
    category: UpdateCategoryDTO,
  ): Promise<Category | null> {
    const categoryFound = await this.findBy({ id });

    if (!categoryFound) {
      throw new NotFoundException('Category not found');
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

  async addPlayerToCategory(id: string, playerId: string): Promise<void> {
    const categoryFound = await this.findBy({ id });

    if (!categoryFound) {
      throw new NotFoundException('Category not found');
    }

    const playerFound = await this.playerService.findBy({ id: playerId });

    if (!playerFound) {
      throw new NotFoundException('Player not found');
    }

    const { players } = categoryFound;
    const playersIds = players.map(player => player._id.toString());

    if (playersIds.includes(playerId)) {
      throw new BadRequestException('Player already in that category');
    }

    return await this.categoryRepository.updateCategoryPlayers(id, playerId);
  }
}
