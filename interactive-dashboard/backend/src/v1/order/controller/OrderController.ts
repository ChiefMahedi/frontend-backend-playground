// controllers/OrderController.ts
import { Request, Response } from "express";
import { GetAllOrders } from "../useCase/GetAllOrders";

export class OrderController {
  constructor(private orderUseCase: GetAllOrders) {}

  async getAllOrders(req: Request, res: Response): Promise<void> {
    const orders = await this.orderUseCase.execute();
    res.json(orders);
  }
}
