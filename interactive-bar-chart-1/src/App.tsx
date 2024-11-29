import { useState, useEffect } from "react";
import BarChart from "./bar-chart/BarChart";
import DataInput from "./bar-chart/components/DataInput";

interface DataObject {
  Product: string;
  TotalValue: number;
  TotalSales: number;
}

function App() {
  const [data, setData] = useState<DataObject[]>([]);

  const sampleData =  [
    { Product: "aaa", TotalValue: 10, TotalSales: 10 },
    { Product: "ooo", TotalValue: 17, TotalSales: 8 },
    { Product: "rtt", TotalValue: 23, TotalSales: 4 },
    { Product: "ghh", TotalValue: 40, TotalSales: 15 },
    { Product: "dww", TotalValue: 30, TotalSales: 10 },
    { Product: "ytt", TotalValue: 26, TotalSales: 7 },
    { Product: "eee", TotalValue: 15, TotalSales: 7 },
    { Product: "qyy", TotalValue: 18, TotalSales: 7 },
    { Product: "prp", TotalValue: 20, TotalSales: 7 },
    { Product: "hgt", TotalValue: 40, TotalSales: 7 }
  ];

  useEffect(() => {
    // Sort the sample data and update the state
    const sortedData = sampleData.slice().sort((a, b) => {
      if (b.TotalSales !== a.TotalSales) {
        return b.TotalSales - a.TotalSales;
      }
      return b.TotalValue - a.TotalValue;
    });

    // Set the sorted data to the state
    setData(sortedData);
    console.log('Sorted data', sortedData); 
  }, []); 

  // Conditionally render BarChart only after data is set
  if (data.length === 0) {
    return <div>Loading...</div>;  
  }
  function handleDataParse(newData: DataObject[]) {
    // Ensure TotalValue and TotalSales are numbers
    const parsedData = newData.map(item => ({
      ...item,
      TotalValue: Number(item.TotalValue),
      TotalSales: Number(item.TotalSales),
    }));

    // Sort data by TotalSales first, then TotalValue as a fallback
    const sortedData = parsedData.slice().sort((a, b) =>
      b.TotalSales - a.TotalSales || b.TotalValue - a.TotalValue
    );

    console.log(sortedData);
    setData(sortedData);
  }

  return (
    <div className="mobile:flex-col tablet:flex-col laptop:flex laptop:flex-row laptop:justify-center laptop:items-center">
      <div className="p-3 flex justify-center items-center">
        <DataInput onDataParse={handleDataParse} />
      </div>
      <div className="laptop:w-10/12  mobile:p-2">
        <BarChart data={data} />
      </div>

    </div>
  );
}

export default App;
