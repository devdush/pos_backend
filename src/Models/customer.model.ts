import { Schema, model, Document } from "mongoose";

interface ICustomer extends Document {
  name: string;
  phone: string;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String },
  phone: { type: String, required: true },
});

export const Customer = model<ICustomer>("Customer", CustomerSchema);
