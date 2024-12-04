import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import CustomerList from "../pages/CustomerList";
import ProductList from '../pages/ProductList';
import OrderList from '../pages/OrderList';
const DashboardRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="Orders" element={<OrderList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default DashboardRouter;
