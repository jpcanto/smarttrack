import { Document } from 'mongoose';

export interface Player extends Document {
  readonly _id: string;
  readonly email: string;
  readonly phoneNumber: string;
  name: string;
  ranking: string;
  rankingPosition: number;
  imageUrl: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
