// repositories/OrderRepository.ts
import { Order } from "../entity/Order";

export interface IOrderRepository {
  getAllOrders(): Promise<Order[]>;
}
