import { Item } from "../Models/item.model";

interface ICartItem {
  productId: string;
  quantity: number;
}
export class ItemService {
  static async createItem(
    itemName: string,
    price: number,
    availableQuantity: number,
    image: string,
    itemType: string,
    categoryId: string
  ) {
    try {
      const newItem = await Item.create({
        itemName,
        price,
        availableQuantity,
        productImage: image,
        itemType,
        categoryId,
      });
      if (!newItem) {
        return { success: false, message: "Failed to create item" };
      }
      return {
        success: true,
        data: newItem,
        message: "Item created successfully",
      };
    } catch (error) {
      console.error("Error creating item:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async getAllItems() {
    try {
      const items = await Item.find().populate("categoryInfo");
      return {
        success: true,
        data: items,
        message: "Items fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching items:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async getItemById(id: string) {
    try {
      const item = await Item.findById(id).populate("categoryInfo");
      if (!item) {
        return { success: false, message: "Item not found" };
      }
      return { success: true, data: item };
    } catch (error) {
      console.error("Error fetching item:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async updateItemsAfterOrder(itemsSold: ICartItem[]) {
    try {
      if (!itemsSold || itemsSold.length === 0) {
        return { success: false, message: "No items provided" };
      }

      // Prepare bulk update operations
      const bulkOps = itemsSold.map((item) => ({
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { availableQuantity: -item.quantity } },
        },
      }));

      // Execute all updates in a single DB call
      const result = await Item.bulkWrite(bulkOps);

      return {
        success: true,
        data: result,
        message: "Items updated successfully",
      };
    } catch (error) {
      console.error("Error updating items:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  static async deleteItem(id: string) {
    try {
      const deletedItem = await Item.findByIdAndDelete(id);
      if (!deletedItem) {
        return { success: false, message: "Item not found" };
      }
      return { success: true, message: "Item deleted successfully" };
    } catch (error) {
      console.error("Error deleting item:", error);
      return { success: false, message: "Internal server error" };
    }
  }
}
