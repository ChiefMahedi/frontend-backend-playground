// usecases/ProductUseCase.ts
import { IProductRepository } from "../repository/IProductRepository";
import { Product } from "../entity/Product";

export class ProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAllProducts();
  }
}
