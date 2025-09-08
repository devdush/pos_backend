import { Table } from "../Models/table.model";

export class TableService {
  static async createTable(name: string, status: string) {
    try {
      const newTable = new Table({ name, status });
      await newTable.save();
      if (!newTable) {
        return { success: false, message: "Table creation failed" };
      }
      return {
        success: true,
        message: "Table created successfully",
        table: newTable,
      };
    } catch (error) {
      console.error("Error creating table:", error);
      return { success: false, message: "Table creation failed", error };
    }
  }
  static async getAllTables() {
    try {
      const tables = await Table.find();
      if (!tables) {
        return { success: false, message: "No tables found" };
      }
      return { success: true, tables };
    } catch (error) {
      console.error("Error fetching tables:", error);
      return { success: false, message: "Failed to fetch tables", error };
    }
  }
  static async getTableById(id: string) {
    try {
      const table = await Table.findById(id);
      if (!table) {
        return { success: false, message: "Table not found" };
      }
      return { success: true, table };
    } catch (error) {
      console.error("Error fetching table:", error);
      return { success: false, message: "Failed to fetch table", error };
    }
  }
  static async updateTableStatus(id: string, status: string) {
    try {
      const table = await Table.findByIdAndUpdate(
        id,
        { status, occupiedAt: status === "Occupied" ? new Date() : null },
        { new: true }
      );
      if (!table) {
        return { success: false, message: "Table not found" };
      }
      return {
        success: true,
        table,
        message: "Table status updated successfully",
      };
    } catch (error) {
      console.error("Error updating table status:", error);
      return {
        success: false,
        message: "Failed to update table status",
        error,
      };
    }
  }
  static async deleteTable(id: string) {
    try {
      const table = await Table.findByIdAndDelete(id);
      if (!table) {
        return { success: false, message: "Table not found" };
      }
      return {
        success: true,
        table,
        message: "Table deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting table:", error);
      return {
        success: false,
        message: "Failed to delete table",
        error,
      };
    }
  }
}
