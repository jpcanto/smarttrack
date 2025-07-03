import { Module } from '@nestjs/common';
import { PlayerController } from './http/controller/player.controller';
import { PlayerService } from '../domain/services/player.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from '../domain/entities/player.schema';
import { PlayerRepositoryImpl } from './repositories/player.repository.impl';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
  ],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    {
      provide: 'PlayerRepository',
      useClass: PlayerRepositoryImpl,
    },
  ],
  exports: [
    PlayerService,
    {
      provide: 'PlayerRepository',
      useClass: PlayerRepositoryImpl,
    },
  ],
})
export class PlayerModule {}
