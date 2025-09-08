import { Schema, model, Document } from "mongoose";

interface ICategory extends Document {
  categoryName: string;
  categoryImage: string;
}

const CategorySchema = new Schema<ICategory>({
  categoryName: { type: String, required: true },
  categoryImage: { type: String, required: true },
});

export const Category = model<ICategory>("Category", CategorySchema);
