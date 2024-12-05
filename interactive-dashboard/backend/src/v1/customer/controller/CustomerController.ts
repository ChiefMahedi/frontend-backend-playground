import { Request, Response } from 'express';
import { GetAllCustomersUseCase } from '../useCase/GetAllCustomer';
import { InMemoryCustomerRepository } from '../repositoryImpl/InMemoryImpl';
export class CustomerController {
  constructor(
    private getAllCustomersUseCase: GetAllCustomersUseCase
  ) {}

  async getAllCustomers(req: Request, res: Response): Promise<Response> {
    try {
      const customers = await this.getAllCustomersUseCase.execute();
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch customers' });
    }
  }
}
