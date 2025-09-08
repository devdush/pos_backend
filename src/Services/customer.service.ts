import { Customer } from "../Models/customer.model";

export class CustomerService {
  static async createCustomer(name: string, phone: string) {
    try {
      const customer = new Customer({ name, phone });
      await customer.save();
      return { success: true, data: customer };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  static async getAllCustomers() {
    try {
      const customers = await Customer.find();
      return { success: true, data: customers };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
  static async getCustomerById(id: string) {
    try {
      const customer = await Customer.findById(id);
      if (!customer) {
        return { success: false, message: "Customer not found" };
      }

      return { success: true, data: customer };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }
}
