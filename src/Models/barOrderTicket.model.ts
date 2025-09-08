import { Schema, model, Document, Types } from "mongoose";

interface IBarOrderTicket extends Document {
  tableId: Types.ObjectId;
  stuartId: Types.ObjectId;
  stuartRequestId: Types.ObjectId;
  items: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  status: "pending" | "in-progress" | "completed";
}
const BarOrderTicketSchema = new Schema<IBarOrderTicket>(
  {
    tableId: { type: Schema.Types.ObjectId, ref: "Table", required: true },
    stuartId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stuartRequestId: {
      type: Schema.Types.ObjectId,
      ref: "StuartOrder",
      required: true,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
BarOrderTicketSchema.virtual("productDetails", {
  ref: "Item",
  localField: "items.productId",
  foreignField: "_id",
  justOne: false,
});
BarOrderTicketSchema.virtual("tableInfo", {
  ref: "Table",
  localField: "tableId",
  foreignField: "_id",
  justOne: true,
});
BarOrderTicketSchema.virtual("stuartInfo", {
  ref: "User",
  localField: "stuartId",
  foreignField: "_id",
  justOne: true,
});
BarOrderTicketSchema.virtual("stuartRequestInfo", {
  ref: "StuartOrder",
  localField: "stuartRequestId",
  foreignField: "_id",
  justOne: true,
});
export const BarOrderTicket = model<IBarOrderTicket>(
  "BarOrderTicket",
  BarOrderTicketSchema
);
