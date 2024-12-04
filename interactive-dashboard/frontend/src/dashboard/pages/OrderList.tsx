import { useState } from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const orders = [
    { OrderID: 101, CustomerName: "John Doe", Product: "Paracetamol Tablets", Quantity: 5, TotalPrice: 25, Status: "Delivered" },
    { OrderID: 102, CustomerName: "Jane Smith", Product: "Cough Syrup", Quantity: 2, TotalPrice: 30, Status: "Pending" },
    { OrderID: 103, CustomerName: "Alice Brown", Product: "Hand Sanitizer", Quantity: 10, TotalPrice: 30, Status: "Shipped" },
    { OrderID: 104, CustomerName: "Bob Johnson", Product: "Blood Pressure Monitor", Quantity: 1, TotalPrice: 50, Status: "Delivered" },
    { OrderID: 105, CustomerName: "Charlie Wilson", Product: "Antiseptic Cream", Quantity: 3, TotalPrice: 21, Status: "Canceled" },
    { OrderID: 106, CustomerName: "Emily Davis", Product: "Pain Relief Spray", Quantity: 4, TotalPrice: 80, Status: "Pending" },
    { OrderID: 107, CustomerName: "Frank Miller", Product: "Thermometer", Quantity: 2, TotalPrice: 50, Status: "Shipped" },
];

const OrderList = () => {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    const filteredOrders = orders
        .filter((order) =>
            Object.values(order).some((value) =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        )
        .sort((a, b) => {
            if (!sortField) return 0;
            if (sortOrder === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        });

    const totalItems = filteredOrders.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const displayedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-3">
            <div className="laptop:flex-row flex-col flex justify-between items-center mb-3 pl-3">
                <div className="laptop:flex-col flex flex-col">
                    <h1 className="font-semibold ml-7 mt-12 laptop:mt-3 laptop:self-start antialiased text-lg font-poppins self-center">
                        Order List
                    </h1>
                    <div className="self-center laptop:self-start">
                        <Breadcrumbs
                            mainPage="Orders"
                            parentPage="Dashboard"
                            onClickMainPage={() => navigate('/orders')}
                            onClickParentPage={() => navigate('/')}
                        />
                    </div>
                </div>

                <div className="mr-4">
                    <input
                        className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded shadow-sm focus:shadow-md"
                        placeholder="Filter by column data..."
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-slate-200 rounded shadow-sm">
                    <thead>
                        <tr>
                            <th
                                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                                onClick={() => handleSort('OrderID')}
                            >
                                Order ID <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th
                                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                                onClick={() => handleSort('CustomerName')}
                            >
                                Customer Name <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th className="py-2 px-4 border-b border-slate-200 text-left">Product</th>
                            <th
                                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                                onClick={() => handleSort('Quantity')}
                            >
                                Quantity <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th
                                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                                onClick={() => handleSort('TotalPrice')}
                            >
                                Total Price ($) <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th
                                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                                onClick={() => handleSort('Status')}
                            >
                                Status <FontAwesomeIcon icon={faSort} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedOrders.map((order, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4">{order.OrderID}</td>
                                <td className="py-2 px-4">{order.CustomerName}</td>
                                <td className="py-2 px-4">{order.Product}</td>
                                <td className="py-2 px-4">{order.Quantity}</td>
                                <td className="py-2 px-4">{order.TotalPrice}</td>
                                <td className="py-2 px-4">{order.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-3 ml-5">
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`px-4 py-2 mx-1 border ${page === currentPage
                                ? 'bg-slate-700 text-white'
                                : 'bg-white text-blue-slate'
                                }`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
