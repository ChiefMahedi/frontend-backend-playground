// controllers/ProductController.ts
import { Request, Response } from "express";
import { ProductUseCase } from "../useCase/GetAllProducts";

export class ProductController {
  constructor(private productUseCase: ProductUseCase) {}

  async getAllProducts(req: Request, res: Response): Promise<void> {
    const products = await this.productUseCase.getAllProducts();
    res.json(products);
  }
}
