import { useState } from 'react';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
//Structure of the data
interface DataObject {
  Date: string;
  Product: string;
  MonthSales: number;
}
interface DataInputProps {
  onDataParse: (data: DataObject[]) => void;
}
function DataInput(dataInputParse: DataInputProps) {
  const [, setData] = useState<DataObject[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      toast.error('No file selected.', {
        position: "top-right",
      });
      return;
    }
    setData([]);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as DataObject[];
        const isValid = parsedData.every(
          (row) =>
            "Date" in row &&
            "Product" in row &&
            "MonthSales" in row &&
            !isNaN(Number(row.MonthSales))
        );

        if (isValid) {
          const productToMonthsMap = new Map<string, string[]>();
          for (const row of parsedData) {
            const { Product, Date } = row;
            if (productToMonthsMap.has(Product)) {
              productToMonthsMap.get(Product)?.push(Date);
            } else {
              productToMonthsMap.set(Product, [Date]);
            }
          }

          for (const [key, value] of productToMonthsMap.entries()) {
            if (value.length !== 2) {
              toast.error(
                `Invalid Data. Product ${key} has ${value.length} rows for Current and Previous months(expected exactly 2).`,
                { position: "top-right" }
              );
              return;
            }
          }

          toast.success("File Uploaded Successfully!", {
            position: "top-center",
          });
          setData(parsedData); 
          dataInputParse.onDataParse(parsedData); 
        } else {
          toast.error(
            "Invalid CSV format. Ensure headers match: Date, Product, MonthSales.",
            { position: "top-right" }
          );
        }
      },
      error: (err) => {
        toast.error(`Error parsing file: ${err.message}`, {
          position: "top-right",
        });
       
      },
    });
    event.target.value = "";
  };

  return (
    <>
      <div className="flex flex-col gap-3  justify-center  items-center shadow-xl w-64 h-80 p-3 border border-gray-300 rounded">
        <FontAwesomeIcon
          size="2x"
          icon={faChartColumn}
          className="bg-blue-800 text-white p-1  rounded "
        />
        <h1 className="font-bold text-lg">Interactive Bar Chart</h1>
        <p className="text-xs border  rounded  border-blue-300 p-3">
          <span className="font-bold">Note:</span> The file must be a .csv file
          and must contain only these three Columns: Date, Product, and
          MonthSales of type string, string, and number respectively
        </p>
        <p className="text-xs">Choose your dataset below:</p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="text-white w-48 p-1 border border-gray-300 bg-blue-300 rounded focus:ring focus:ring-blue-200"
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default DataInput;
