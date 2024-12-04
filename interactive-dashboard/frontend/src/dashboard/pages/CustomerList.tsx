/* eslint-disable @typescript-eslint/no-unused-vars */
import {SetStateAction, useState } from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort} from '@fortawesome/free-solid-svg-icons';
import EmailFormModal from '../components/EmailFormModal';
type Customer = {
    ID: string;
    CustomerName: string;
    Division: string;
    Gender: string;
    MaritalStatus: string;
    Age: number;
    Income: number;
    Email: string;
};
const customers = [
    { ID: "BU79786", CustomerName: "Andrew", Division: "Dhaka", Gender: "F", MaritalStatus: "Married", Age: 31, Income: 56274, Email:'chiefmahedi@gmail.com'},
    { ID: "QZ44356", CustomerName: "Anne", Division: "Rajshahi", Gender: "F", MaritalStatus: "Single", Age: 46, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "AI49188", CustomerName: "Anthony", Division: "Khulna", Gender: "F", MaritalStatus: "Married", Age: 43, Income: 48767, Email:'chiefmahedi@gmail.com' },
    { ID: "WW63253", CustomerName: "Barbara", Division: "Barishal", Gender: "M", MaritalStatus: "Married", Age: 36, Income: 0, Email:'chiefmahedi@gmail.com' },
    { ID: "HB64268", CustomerName: "Brian", Division: "Mymensingh", Gender: "M", MaritalStatus: "Single", Age: 35, Income: 43836 , Email:'chiefmahedi@gmail.com'},
    { ID: "OC83172", CustomerName: "Bruce", Division: "Sylhet", Gender: "F", MaritalStatus: "Married", Age: 41, Income: 62902 , Email:'chiefmahedi@gmail.com'},
    { ID: "XZ87318", CustomerName: "Carol", Division: "Khulna", Gender: "F", MaritalStatus: "Married", Age: 26, Income: 55350 , Email:'chiefmahedi@gmail.com'},
    { ID: "CF85061", CustomerName: "Christine", Division: "Barishal", Gender: "M", MaritalStatus: "Single", Age: 25, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "DY87989", CustomerName: "Christopher", Division: "Mymensingh", Gender: "M", MaritalStatus: "Divorced", Age: 24, Income: 14072 , Email:'chiefmahedi@gmail.com'},
    { ID: "BQ94931", CustomerName: "Craig", Division: "Sylhet", Gender: "F", MaritalStatus: "Married", Age: 26, Income: 28812 , Email:'chiefmahedi@gmail.com'},
    { ID: "SX51350", CustomerName: "David", Division: "Rangpur", Gender: "M", MaritalStatus: "Single", Age: 24, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "VQ65197", CustomerName: "Diane", Division: "Chattogram", Gender: "F", MaritalStatus: "Married", Age: 27, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "DP39365", CustomerName: "Elizabeth", Division: "Dhaka", Gender: "M", MaritalStatus: "Married", Age: 28, Income: 77026 , Email:'chiefmahedi@gmail.com' },
    { ID: "SJ95423", CustomerName: "Grant", Division: "Rajshahi", Gender: "M", MaritalStatus: "Married", Age: 40, Income: 99845 , Email:'chiefmahedi@gmail.com'},
    { ID: "IL66569", CustomerName: "Gregory", Division: "Khulna", Gender: "M", MaritalStatus: "Single", Age: 32, Income: 83689 , Email:'chiefmahedi@gmail.com'},
    { ID: "BW63560", CustomerName: "Heather", Division: "Barishal", Gender: "F", MaritalStatus: "Married", Age: 30, Income: 24599 , Email:'chiefmahedi@gmail.com'},
    { ID: "FV94802", CustomerName: "Helen", Division: "Mymensingh", Gender: "M", MaritalStatus: "Married", Age: 50, Income: 25049 , Email:'chiefmahedi@gmail.com'},
    { ID: "OE15005", CustomerName: "Ian", Division: "Sylhet", Gender: "M", MaritalStatus: "Married", Age: 24, Income: 28855 , Email:'chiefmahedi@gmail.com'},
    { ID: "WC83389", CustomerName: "James", Division: "Rangpur", Gender: "M", MaritalStatus: "Married", Age: 39, Income: 51148 , Email:'chiefmahedi@gmail.com'},
    { ID: "FL50705", CustomerName: "Janet", Division: "Chattogram", Gender: "F", MaritalStatus: "Married", Age: 38, Income: 66140 , Email:'chiefmahedi@gmail.com'},
    { ID: "ZK25313", CustomerName: "Janice", Division: "Dhaka", Gender: "M", MaritalStatus: "Single", Age: 33, Income: 57749 , Email:'chiefmahedi@gmail.com'},
    { ID: "SV62436", CustomerName: "Jennifer", Division: "Rajshahi", Gender: "F", MaritalStatus: "Divorced", Age: 31, Income: 13789 , Email:'chiefmahedi@gmail.com'},
    { ID: "YH23384", CustomerName: "John", Division: "Mymensingh", Gender: "M", MaritalStatus: "Divorced", Age: 36, Income: 14072 , Email:'chiefmahedi@gmail.com'},
    { ID: "TZ98966", CustomerName: "Judith", Division: "Sylhet", Gender: "F", MaritalStatus: "Single", Age: 28, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "HM55802", CustomerName: "Julie", Division: "Rangpur", Gender: "F", MaritalStatus: "Married", Age: 49, Income: 17870 , Email:'chiefmahedi@gmail.com'},
    { ID: "FS42516", CustomerName: "Karen", Division: "Chattogram", Gender: "M", MaritalStatus: "Married", Age: 34, Income: 97541 , Email:'chiefmahedi@gmail.com'},
    { ID: "US89481", CustomerName: "Kevin", Division: "Dhaka", Gender: "F", MaritalStatus: "Single", Age: 46, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "HO30839", CustomerName: "Linda", Division: "Rajshahi", Gender: "F", MaritalStatus: "Married", Age: 32, Income: 10511 , Email:'chiefmahedi@gmail.com'},
    { ID: "GE62437", CustomerName: "Lorraine", Division: "Khulna", Gender: "F", MaritalStatus: "Single", Age: 26, Income: 86584 , Email:'chiefmahedi@gmail.com'},
    { ID: "EJ77678", CustomerName: "Lynette", Division: "Rangpur", Gender: "F", MaritalStatus: "Married", Age: 49, Income: 75690 , Email:'chiefmahedi@gmail.com'},
    { ID: "SV85652", CustomerName: "Margaret", Division: "Chattogram", Gender: "M", MaritalStatus: "Married", Age: 38, Income: 23158 , Email:'chiefmahedi@gmail.com'},
    { ID: "UL64533", CustomerName: "Mark", Division: "Dhaka", Gender: "M", MaritalStatus: "Married", Age: 46, Income: 65999 , Email:'chiefmahedi@gmail.com'},
    { ID: "PF41800", CustomerName: "Mary", Division: "Rajshahi", Gender: "M", MaritalStatus: "Married", Age: 28, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "AO98601", CustomerName: "Michael", Division: "Khulna", Gender: "M", MaritalStatus: "Married", Age: 45, Income: 54500 , Email:'chiefmahedi@gmail.com'},
    { ID: "SK67821", CustomerName: "Pamela", Division: "Barishal", Gender: "F", MaritalStatus: "Married", Age: 27, Income: 37260 , Email:'chiefmahedi@gmail.com'},
    { ID: "YV55495", CustomerName: "Patricia", Division: "Mymensingh", Gender: "F", MaritalStatus: "Married", Age: 41, Income: 68987 , Email:'chiefmahedi@gmail.com'},
    { ID: "KY38074", CustomerName: "Paul", Division: "Sylhet", Gender: "M", MaritalStatus: "Married", Age: 33, Income: 42305 , Email:'chiefmahedi@gmail.com'},
    { ID: "DM79012", CustomerName: "Peter", Division: "Rangpur", Gender: "F", MaritalStatus: "Married", Age: 45, Income: 65706 , Email:'chiefmahedi@gmail.com'},
    { ID: "CM61827", CustomerName: "Philip", Division: "Chattogram", Gender: "M", MaritalStatus: "Single", Age: 40, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "WC35801", CustomerName: "Richard", Division: "Khulna", Gender: "M", MaritalStatus: "Divorced", Age: 26, Income: 53243 , Email:'chiefmahedi@gmail.com'},
    { ID: "QG25316", CustomerName: "Robert", Division: "Rangpur", Gender: "F", MaritalStatus: "Married", Age: 49, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "MB98372", CustomerName: "Robyn", Division: "Chattogram", Gender: "F", MaritalStatus: "Single", Age: 47, Income: 50071 , Email:'chiefmahedi@gmail.com'},
    { ID: "IL19217", CustomerName: "Sandra", Division: "Dhaka", Gender: "F", MaritalStatus: "Married", Age: 42, Income: 60021 , Email:'chiefmahedi@gmail.com'},
    { ID: "SR38658", CustomerName: "Stephen", Division: "Rajshahi", Gender: "M", MaritalStatus: "Married", Age: 26, Income: 43244 , Email:'chiefmahedi@gmail.com'},
    { ID: "DH39433", CustomerName: "Steven", Division: "Sylhet", Gender: "M", MaritalStatus: "Single", Age: 31, Income: 67005 , Email:'chiefmahedi@gmail.com'},
    { ID: "LK92661", CustomerName: "Susan", Division: "Mymensingh", Gender: "M", MaritalStatus: "Married", Age: 48, Income: 98640 , Email:'chiefmahedi@gmail.com'},
    { ID: "IS78530", CustomerName: "Thomas", Division: "Chattogram", Gender: "F", MaritalStatus: "Married", Age: 29, Income: 0 , Email:'chiefmahedi@gmail.com'},
    { ID: "AG97862", CustomerName: "Timothy", Division: "Dhaka", Gender: "M", MaritalStatus: "Married", Age: 25, Income: 34721 , Email:'chiefmahedi@gmail.com'},
];

const CustomerList = () => {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState<keyof Customer | null>(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to the first page on search
    };

    const handleSort = (field: keyof Customer) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    const filteredCustomers = customers
        .filter((customer) =>
            Object.values(customer).some((value) =>
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

    const totalItems = filteredCustomers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const displayedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-3">
            <div className="laptop:flex-row flex-col flex justify-between items-center mb-3 pl-3">
                <div className="laptop:flex-col flex flex-col">
                    <h1 className="font-semibold ml-7 mt-12 laptop:mt-3 laptop:self-start antialiased text-lg font-poppins self-center">
                        Customer Dashboard
                    </h1>
                    <div className="self-center laptop:self-start">
                        <Breadcrumbs
                            mainPage="Customers"
                            parentPage="Dashboard"
                            onClickMainPage={() => navigate('/customers')}
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
                                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer text-sm"
                                onClick={() => handleSort('CustomerName')}
                            >
                                Name <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th className="py-2 px-4 border-b border-slate-200 text-left">Division</th>
                            <th className="py-2 px-4 border-b border-slate-200 text-left">Gender</th>
                            <th className="py-2 px-4 border-b border-slate-200 text-left">Marital Status</th>
                            <th
                                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                                onClick={() => handleSort('Age')}
                            >
                                Age <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th
                                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                                onClick={() => handleSort('Income')}
                            >
                                Income <FontAwesomeIcon icon={faSort} />
                            </th>
                            <th className="py-2 px-4 border-b border-slate-200 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedCustomers.map((customer, _index) => (
                            <tr key={customer.ID} className="border-b">
                                <td className="py-2 px-4">{customer.CustomerName}</td>
                                <td className="py-2 px-4">{customer.Division}</td>
                                <td className="py-2 px-4">{customer.Gender}</td>
                                <td className="py-2 px-4">{customer.MaritalStatus}</td>
                                <td className="py-2 px-4">{customer.Age}</td>
                                <td className="py-2 px-4">{customer.Income}</td>
                                <td className="py-2 px-4 flex flex-col laptop:flex laptop:flex-row items-center">
                                    <div>
                                        {customer.Email}
                                    </div>
                                    <div className='mt-1'>
                                        <EmailFormModal email={customer.Email} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 laptop:flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2  border ${currentPage === index + 1
                            ? 'bg-slate-700 text-white'
                            : 'bg-white text-slate-700 text-sm'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CustomerList;
