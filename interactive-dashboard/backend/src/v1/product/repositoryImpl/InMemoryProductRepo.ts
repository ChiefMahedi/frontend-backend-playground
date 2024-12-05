// repositories/InMemoryProductRepository.ts
import { Product } from "../entity/Product";
import { IProductRepository } from "../repository/IProductRepository";

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [
        { ProductName: "Paracetamol Tablets", Category: "Pharmaceuticals", Stock: 500, Price: 5, Rating: 4.5 },
        { ProductName: "Ibuprofen Gel", Category: "Pharmaceuticals", Stock: 300, Price: 10, Rating: 4.4 },
        { ProductName: "Antiseptic Cream", Category: "Pharmaceuticals", Stock: 400, Price: 7, Rating: 4.6 },
        { ProductName: "Cough Syrup", Category: "Pharmaceuticals", Stock: 250, Price: 15, Rating: 4.7 },
        { ProductName: "Vitamin D Capsules", Category: "Pharmaceuticals", Stock: 600, Price: 12, Rating: 4.8 },
        { ProductName: "Insulin Injection", Category: "Pharmaceuticals", Stock: 100, Price: 25, Rating: 4.9 },
        { ProductName: "Antacid Tablets", Category: "Pharmaceuticals", Stock: 350, Price: 8, Rating: 4.3 },
        { ProductName: "Pain Relief Spray", Category: "Pharmaceuticals", Stock: 200, Price: 20, Rating: 4.5 },
        { ProductName: "Allergy Relief Tablets", Category: "Pharmaceuticals", Stock: 450, Price: 18, Rating: 4.7 },
        { ProductName: "Antibiotic Ointment", Category: "Pharmaceuticals", Stock: 220, Price: 14, Rating: 4.6 },
        { ProductName: "Eye Drops", Category: "Pharmaceuticals", Stock: 300, Price: 10, Rating: 4.8 },
        { ProductName: "Oral Rehydration Salts", Category: "Pharmaceuticals", Stock: 500, Price: 5, Rating: 4.9 },
        { ProductName: "Thermometer", Category: "Pharmaceuticals", Stock: 150, Price: 25, Rating: 4.6 },
        { ProductName: "Blood Pressure Monitor", Category: "Pharmaceuticals", Stock: 100, Price: 50, Rating: 4.8 },
        { ProductName: "Hand Sanitizer", Category: "Pharmaceuticals", Stock: 1000, Price: 3, Rating: 4.7 },
        { ProductName: "First Aid Kit", Category: "Pharmaceuticals", Stock: 120, Price: 35, Rating: 4.5 },
        { ProductName: "Bandages", Category: "Pharmaceuticals", Stock: 800, Price: 2, Rating: 4.6 },
        { ProductName: "Face Masks", Category: "Pharmaceuticals", Stock: 700, Price: 1, Rating: 4.8 },
        { ProductName: "Surgical Gloves", Category: "Pharmaceuticals", Stock: 400, Price: 10, Rating: 4.7 },
        { ProductName: "Pregnancy Test Kit", Category: "Pharmaceuticals", Stock: 300, Price: 15, Rating: 4.9 },
      ];

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }
}
