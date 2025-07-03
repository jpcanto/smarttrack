import { Schema, Types } from 'mongoose';

export const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    events: [
      {
        name: { type: String, required: true },
        operation: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
    players: [
      {
        type: Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);
