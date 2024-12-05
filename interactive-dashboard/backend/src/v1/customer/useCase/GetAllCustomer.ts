import Customer from "../entity/Customer";
import { ICustomerRepository } from "../repository/ICustomerRepository";

export class GetAllCustomersUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<Customer[]> {
    return await this.customerRepository.getAllCustomers();
  }
}
