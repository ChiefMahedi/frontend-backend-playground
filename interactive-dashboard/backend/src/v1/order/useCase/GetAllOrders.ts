import { IOrderRepository } from "../repository/IOrderRepository";
import { Order } from "../entity/Order";

export class GetAllOrders {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    return await this.orderRepository.getAllOrders();
  }
}
