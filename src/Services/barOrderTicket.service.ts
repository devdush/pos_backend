import { BarOrderTicket } from "../Models/barOrderTicket.model";
import { KitchenOrderTicket } from "../Models/kitchenOrderTicket.model";

export class BarOrderTicketService {
  static async generateBarOrderTicket(
    tableId: string,
    stuartId: string,
    stuartRequestId: string,
    items: { productId: string; quantity: number }[],
    status: "pending" | "in-progress" | "completed"
  ) {
    try {
      const barOrderTicket = new BarOrderTicket({
        tableId,
        stuartId,
        stuartRequestId,
        items,
        status,
      });

      await barOrderTicket.save();
      if (!barOrderTicket) {
        return {
          success: false,
          message: "Bar Order Ticket generation failed",
        };
      } else {
        return {
          success: true,
          message: "Bar Order Ticket generated successfully",
          barOrderTicket,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Bar Order Ticket generation failed",
        error,
      };
    }
  }
  static async getAllBarOrderTickets() {
    try {
      const barOrderTickets = await BarOrderTicket.find()
        .populate(["tableInfo", "stuartInfo", "stuartRequestInfo"])
        .sort({ createdAt: -1 });
      if (!barOrderTickets || barOrderTickets.length === 0) {
        return { success: false, message: "No Bar Order Tickets found" };
      }
      return {
        success: true,
        message: "Bar Order Tickets retrieved successfully",
        barOrderTickets,
      };
    } catch (error) {
      return {
        success: false,
        message: "Bar Order Ticket retrieval failed",
        error,
      };
    }
  }
}
