import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from 'src/player/domain/dtos/createPlayer.dto';
import { UpdatePlayerDto } from 'src/player/domain/dtos/updatePlayer.dto';
import { Player } from 'src/player/domain/interfaces/player.interface';
import { PlayerRepository } from 'src/player/domain/repositories/player.repository';

@Injectable()
export class PlayerRepositoryImpl implements PlayerRepository {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async create(player: CreatePlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(player);
    return await createdPlayer.save();
  }

  async update(id: string, player: UpdatePlayerDto): Promise<Player | null> {
    return await this.playerModel
      .findByIdAndUpdate(id, player, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.playerModel.findByIdAndDelete(id).exec();
  }

  async findAll(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async findById(id: string): Promise<Player | null> {
    return await this.playerModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<Player | null> {
    return await this.playerModel.findOne({ email }).exec();
  }

  async findByName(name: string): Promise<Player | null> {
    return await this.playerModel.findOne({ name }).exec();
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Player | null> {
    return await this.playerModel.findOne({ phoneNumber }).exec();
  }
}
