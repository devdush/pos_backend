import { Schema, model, Document, Types } from "mongoose";

export interface IStuartOrder extends Document {
  stuartId: Types.ObjectId;
  tableId: Types.ObjectId;
  items: Array<{
    productId: Types.ObjectId;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
}
const StuartOrderSchema = new Schema<IStuartOrder>(
  {
    stuartId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tableId: { type: Schema.Types.ObjectId, ref: "Table", required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "billed"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

StuartOrderSchema.virtual("productsInfo", {
  ref: "Item",
  localField: "items.productId",
  foreignField: "_id",
  justOne: false,
});
StuartOrderSchema.virtual("stuartInfo", {
  ref: "User",
  localField: "stuartId",
  foreignField: "_id",
  justOne: true,
});
StuartOrderSchema.virtual("tableInfo", {
  ref: "Table",
  localField: "tableId",
  foreignField: "_id",
  justOne: true,
});
export const StuartOrder = model<IStuartOrder>(
  "StuartOrder",
  StuartOrderSchema
);
