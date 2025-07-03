import { Module } from '@nestjs/common';
import { PlayerModule } from './player/infra/player.module';
import { PlayerService } from './player/domain/services/player.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/smarttraking?authSource=admin',
    ),
    PlayerModule,
  ],
  controllers: [],
  providers: [PlayerService],
})
export class AppModule {}
