import {
  Injectable,
  Logger,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreatePlayerDTO } from '../dtos/createPlayer.dto';
import { Player } from '../interfaces/player.interface';
import { PlayerRepository } from '../repositories/player.repository';
import { UpdatePlayerDTO } from '../dtos/updatePlayer.dto';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);

  constructor(
    @Inject('PlayerRepository')
    private readonly playerRepository: PlayerRepository,
  ) {}

  async create(player: CreatePlayerDTO): Promise<Player> {
    const { email, phoneNumber, name } = player;

    if (await this.playerRepository.findByName(name)) {
      throw new BadRequestException('A player with this Name already exists');
    }

    if (await this.playerRepository.findByEmail(email)) {
      throw new BadRequestException('A player with this Email already exists');
    }

    if (await this.playerRepository.findByPhoneNumber(phoneNumber)) {
      throw new BadRequestException(
        'A player with this Phone number already exists',
      );
    }

    return this.playerRepository.create(player);
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.findAll();
  }

  async findBy({
    id,
    name,
    email,
    phoneNumber,
  }: {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
  }): Promise<Player | null> {
    if (id) {
      return this.playerRepository.findById(id);
    }
    if (name) {
      return this.playerRepository.findByName(name);
    }
    if (email) {
      return this.playerRepository.findByEmail(email);
    }
    if (phoneNumber) {
      return this.playerRepository.findByPhoneNumber(phoneNumber);
    }
    return null;
  }

  async update(id: string, player: UpdatePlayerDTO): Promise<Player | null> {
    const playerFound = await this.playerRepository.findById(id);

    if (!playerFound) {
      throw new NotFoundException('Player not found');
    }

    if (player.email) {
      const playerWithSameEmail = await this.findBy({ email: player.email });
      if (playerWithSameEmail) {
        throw new BadRequestException('Email already in use');
      }
    }

    if (player.phoneNumber) {
      const playerWithSamePhoneNumber = await this.findBy({
        phoneNumber: player.phoneNumber,
      });
      if (playerWithSamePhoneNumber) {
        throw new BadRequestException('Phone number already in use');
      }
    }

    return this.playerRepository.update(id, player);
  }

  async delete(id: string): Promise<void> {
    const playerFound = await this.playerRepository.findById(id);

    if (!playerFound) {
      throw new NotFoundException('Player not found');
    }

    return this.playerRepository.delete(id);
  }
}
