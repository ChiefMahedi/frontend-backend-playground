import Customer from "../entity/Customer";
export interface ICustomerRepository {
    getAllCustomers(): Promise<Customer[]>; 
}