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
}
