import { Schema, model, Document } from "mongoose";

interface ITable extends Document {
  name: string;
  status: string;
  occupiedAt: Date;
}

const TableSchema = new Schema<ITable>({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  occupiedAt: { type: Date },
});

export const Table = model<ITable>("Table", TableSchema);
