import { Category } from "../Models/category.model";

export class CategoryService {
  static async createCategory(categoryName: string, categoryImage: string) {
    try {
      const newCategory = await Category.create({
        categoryName,
        categoryImage,
      });
      if (!newCategory) {
        return { success: false, message: "Failed to create category" };
      }
      return {
        success: true,
        data: newCategory,
        message: "Category created successfully",
      };
    } catch (error) {
      console.error("Error creating category:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async getAllCategories() {
    try {
      const categories = await Category.find();
      if (!categories) {
        return { success: false, message: "No categories found" };
      }
      return { success: true, data: categories };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async getCategoryById(id: string) {
    try {
      const category = await Category.findById(id);
      if (!category) {
        return { success: false, message: "Category not found" };
      }
      return { success: true, data: category };
    } catch (error) {
      console.error("Error fetching category:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async deleteCategory(id: string) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return { success: false, message: "Category not found" };
      }
      return { success: true, message: "Category deleted successfully" };
    } catch (error) {
      console.error("Error deleting category:", error);
      return { success: false, message: "Internal server error" };
    }
  }
}
