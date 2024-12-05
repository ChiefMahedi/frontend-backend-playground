import express, { Application } from 'express';
import { InMemoryCustomerRepository } from './customer/repositoryImpl/InMemoryImpl';
import { GetAllCustomersUseCase } from './customer/useCase/GetAllCustomer';
import { CustomerController } from './customer/controller/CustomerController';
import { InMemoryOrderRepository } from './order/repositoryImpl/InMemoryImpl';
import { GetAllOrders } from './order/useCase/GetAllOrders';
import { OrderController } from './order/controller/OrderController';
import { InMemoryProductRepository } from './product/repositoryImpl/InMemoryProductRepo';
import { ProductUseCase } from './product/useCase/GetAllProducts';
import { ProductController } from './product/controller/ProductController';
import cors from 'cors'

const app: Application = express();
const PORT = 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
  };

const customerRepository = new InMemoryCustomerRepository();
const getAllCustomersUseCase = new GetAllCustomersUseCase(customerRepository);
const customerController = new CustomerController(getAllCustomersUseCase);


const orderRepository = new InMemoryOrderRepository();
const getAllOrdersUseCase = new GetAllOrders(orderRepository);
const orderController = new OrderController(getAllOrdersUseCase);

const productRepository = new InMemoryProductRepository();
const getAllProductsUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(getAllProductsUseCase);
app.use(cors( corsOptions));
app.use(express.json());
app.get('/customers', (req, res) => {
    customerController.getAllCustomers(req, res)
}
);

app.get('/orders', (req, res) => {
    orderController.getAllOrders(req, res)
}
);

app.get('/products', (req, res) => {
    productController.getAllProducts(req, res)
}
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
