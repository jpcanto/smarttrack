import { Schema } from 'mongoose';

export const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    ranking: { type: String, required: false, default: '' },
    rankingPosition: { type: Number, required: false, default: 0 },
    imageUrl: { type: String, required: false, default: '' },
  },
  { timestamps: true, collection: 'players' },
);
