import { Document } from 'mongoose';
import { Player } from 'src/player/domain/interfaces/player.interface';

export interface Category extends Document {
  _id: string;
  readonly name: string;
  description: string;
  events: Event[];
  players: Player[];
}

export interface Event {
  name: string;
  operation: string;
  value: number;
}
