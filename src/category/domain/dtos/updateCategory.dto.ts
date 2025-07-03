import { IsArray, IsOptional, IsString } from 'class-validator';
import { Player } from 'src/player/domain/interfaces/player.interface';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsArray()
  @IsOptional()
  readonly events: Event[];

  @IsArray()
  @IsOptional()
  readonly players: Player[];
}
