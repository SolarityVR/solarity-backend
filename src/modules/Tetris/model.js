import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TetrisSchema = new Schema(
  {
    amount: {
      type: String,
      default: 0,
    },
    score: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 0
    }
  },
  {
    autoIndex: true,
    timestamps: true,
    toJSON: { getters: true },
  }
);
const UserModel = mongoose.model("Tetris", TetrisSchema, "tetrises");

export default UserModel;
