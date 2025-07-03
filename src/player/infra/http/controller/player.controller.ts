import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CreatePlayerDTO } from 'src/player/domain/dtos/createPlayer.dto';
import { UpdatePlayerDTO } from 'src/player/domain/dtos/updatePlayer.dto';
import { PlayerService } from 'src/player/domain/services/player.service';
import { IdValidationPipe } from '../../../../shared/infra/htpp/pipes/IdValidation.pipe';
import { Player } from 'src/player/domain/interfaces/player.interface';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() player: CreatePlayerDTO): Promise<Player> {
    return await this.playerService.create(player);
  }

  @Get()
  findAll(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Get(':id')
  findById(@Param('id', IdValidationPipe) id: string): Promise<Player | null> {
    return this.playerService.findBy({ id });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() player: UpdatePlayerDTO,
  ): Promise<Player | null> {
    return this.playerService.update(id, player);
  }

  @Delete(':id')
  delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
    return this.playerService.delete(id);
  }
}
