import { Module } from '@nestjs/common';
import { PlayerModule } from './player/infra/player.module';
import { PlayerService } from './player/domain/services/player.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/smarttraking?authSource=admin',
    ),
    PlayerModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [PlayerService],
})
export class AppModule {}
