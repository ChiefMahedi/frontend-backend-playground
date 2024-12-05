// repositories/ProductRepository.ts
import { Product } from "../entity/Product";

export interface IProductRepository {
  getAllProducts(): Promise<Product[]>;
}
