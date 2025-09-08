import { Schema, model, Document, Types } from "mongoose";

interface IItem extends Document {
  itemName: string;
  price: number;
  availableQuantity: number;
  categoryId: Types.ObjectId;
  productImage: string;
  itemType: string;
}

const ItemSchema = new Schema<IItem>(
  {
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    availableQuantity: { type: Number },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productImage: { type: String, required: true },
    itemType: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ItemSchema.virtual("categoryInfo", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

export const Item = model<IItem>("Item", ItemSchema);
