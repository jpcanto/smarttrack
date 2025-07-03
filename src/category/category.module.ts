import { Module } from '@nestjs/common';
import { CategoryService } from './domain/services/category.service';
import { CategoryController } from './infra/http/controller/category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './domain/entities/category.entity';
import { CategoryRepositoryImpl } from './infra/repositories/category.repository.impl';
import { PlayerModule } from 'src/player/infra/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    PlayerModule,
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepositoryImpl,
    },
  ],
})
export class CategoryModule {}
