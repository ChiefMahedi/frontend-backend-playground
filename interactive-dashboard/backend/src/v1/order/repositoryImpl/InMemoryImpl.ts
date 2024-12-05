// repositories/InMemoryOrderRepository.ts
import { Order } from "../entity/Order";
import { IOrderRepository } from "../repository/IOrderRepository";

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Order[] = [
    { OrderID: 101, CustomerName: "John Doe", Product: "Paracetamol Tablets", Quantity: 5, TotalPrice: 25, Status: "Delivered" },
    { OrderID: 102, CustomerName: "Jane Smith", Product: "Cough Syrup", Quantity: 2, TotalPrice: 30, Status: "Pending" },
    { OrderID: 103, CustomerName: "Alice Brown", Product: "Hand Sanitizer", Quantity: 10, TotalPrice: 30, Status: "Shipped" },
    { OrderID: 104, CustomerName: "Bob Johnson", Product: "Blood Pressure Monitor", Quantity: 1, TotalPrice: 50, Status: "Delivered" },
    { OrderID: 105, CustomerName: "Charlie Wilson", Product: "Antiseptic Cream", Quantity: 3, TotalPrice: 21, Status: "Canceled" },
    { OrderID: 106, CustomerName: "Emily Davis", Product: "Pain Relief Spray", Quantity: 4, TotalPrice: 80, Status: "Pending" },
    { OrderID: 107, CustomerName: "Frank Miller", Product: "Thermometer", Quantity: 2, TotalPrice: 50, Status: "Shipped" },
  ];

  async getAllOrders(): Promise<Order[]> {
    return this.orders;
  }
}
