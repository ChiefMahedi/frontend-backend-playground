import { useState } from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

// Define the Product interface
interface Product {
  ProductName: string;
  Category: string;
  Stock: number;
  Price: number;
  Rating: number;
}

const products: Product[] = [
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

const ProductsDashboard = () => {
  // State types
  const [search, setSearch] = useState<string>('');
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage: number = 5;
  const navigate = useNavigate();

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Handle sorting by column
  const handleSort = (field: keyof Product): void => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Reset to the first page on sort
  };

  // Filter and sort the products
  const filteredProducts: Product[] = products
    .filter((product) =>
      Object.values(product).some((value) =>
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

  const totalItems: number = filteredProducts.length;
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  const displayedProducts: Product[] = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="p-3">
      <div className="laptop:flex-row flex-col flex justify-between items-center mb-3 pl-3">
        <div className="laptop:flex-col flex flex-col">
          <h1 className="font-semibold ml-7 mt-12 laptop:mt-3 laptop:self-start antialiased text-lg font-poppins self-center">
            Products Dashboard
          </h1>
          <div className="self-center laptop:self-start">
            <Breadcrumbs
              mainPage="Products"
              parentPage="Dashboard"
              onClickMainPage={() => navigate('/products')}
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
                onClick={() => handleSort('ProductName')}
              >
                Product Name <FontAwesomeIcon icon={faSort} />
              </th>
              <th className="py-2 px-4 border-b border-slate-200 text-left">Category</th>
              <th
                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                onClick={() => handleSort('Stock')}
              >
                Stock <FontAwesomeIcon icon={faSort} />
              </th>
              <th
                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                onClick={() => handleSort('Price')}
              >
                Price ($) <FontAwesomeIcon icon={faSort} />
              </th>
              <th
                className="py-2 px-4 border-b border-slate-200 text-left cursor-pointer"
                onClick={() => handleSort('Rating')}
              >
                Rating <FontAwesomeIcon icon={faSort} />
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{product.ProductName}</td>
                <td className="py-2 px-4">{product.Category}</td>
                <td className="py-2 px-4">{product.Stock}</td>
                <td className="py-2 px-4">{product.Price}</td>
                <td className="py-2 px-4">{product.Rating}</td>
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
                : 'bg-white text-blue-500 border-slate-300 hover:border-slate-400 hover:bg-slate-100'}`}
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

export default ProductsDashboard;
