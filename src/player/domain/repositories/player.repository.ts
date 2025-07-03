import { CreatePlayerDTO } from '../dtos/createPlayer.dto';
import { UpdatePlayerDTO } from '../dtos/updatePlayer.dto';
import { Player } from '../interfaces/player.interface';

export interface PlayerRepository {
  create(player: CreatePlayerDTO): Promise<Player>;
  update(id: string, player: UpdatePlayerDTO): Promise<Player | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Player[]>;
  findById(id: string): Promise<Player | null>;
  findByEmail(email: string): Promise<Player | null>;
  findByName(name: string): Promise<Player | null>;
  findByPhoneNumber(phoneNumber: string): Promise<Player | null>;
}
