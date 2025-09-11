import { KitchenOrderTicket } from "../Models/kitchenOrderTicket.model";

export class KitchenOrderTicketService {
  static async generateKOT(
    tableId: string,
    stuartId: string,
    stuartRequestId: string,
    items: { productId: string; quantity: number }[],
    status: "pending" | "in-progress" | "completed"
  ) {
    try {
      const kitchenOrderTicket = new KitchenOrderTicket({
        tableId,
        stuartId,
        stuartRequestId,
        items,
        status,
      });

      await kitchenOrderTicket.save();
      if (!kitchenOrderTicket) {
        return { success: false, message: "KOT generation failed" };
      } else {
        return {
          success: true,
          message: "KOT generated successfully",
          kot: kitchenOrderTicket,
        };
      }
    } catch (error) {
      console.error("Error generating KOT:", error);
      return { success: false, message: "KOT generation failed", error };
      
    }
  }
  static async getAllKOTs() {
    try {
      const kitchenOrderTickets = await KitchenOrderTicket.find()
        .populate([
          "tableInfo",
          "stuartInfo",
          "stuartRequestInfo",
        ])
        .sort({ createdAt: -1 });
      if (!kitchenOrderTickets || kitchenOrderTickets.length === 0) {
        return { success: false, message: "No KOTs found" };
      }
      return {
        success: true,
        message: "KOTs retrieved successfully",
        kots: kitchenOrderTickets,
      };
    } catch (error) {
      return { success: false, message: "KOT retrieval failed", error };
    }
  }
}
