import { useEffect, useState } from "react";
import DataInput from "./mixed-chart/components/DataInput"
import MixedChart from "./mixed-chart/MixedChart"
interface DataObject {
  Date: string;
  Product: string;
  MonthSales: number;
}

function App() {
  const [data, setData] = useState<DataObject[]>([]);
  const sampleData: DataObject[] = [
    { Date: "7/11/2024", Product: "aaa", MonthSales: 10 },
    { Date: "4/10/2024", Product: "hgt", MonthSales: 20 },
    { Date: "9/11/2024", Product: "prp", MonthSales: 11 },
    { Date: "2/10/2024", Product: "ooo", MonthSales: 8 },
    { Date: "7/10/2024", Product: "aaa", MonthSales: 12 },
    { Date: "8/11/2024", Product: "rtt", MonthSales: 20 },
    { Date: "8/10/2024", Product: "rtt", MonthSales: 18 },
    { Date: "11/10/2024", Product: "ghh", MonthSales: 8 },
    { Date: "17/11/2024", Product: "dww", MonthSales: 18 },
    { Date: "17/11/2024", Product: "ytt", MonthSales: 17 },
    { Date: "6/11/2024", Product: "eee", MonthSales: 15 },
    { Date: "17/10/2024", Product: "dww", MonthSales: 19 },
    { Date: "2/11/2024", Product: "qyy", MonthSales: 7 },
    { Date: "9/10/2024", Product: "prp", MonthSales: 10 },
    { Date: "4/11/2024", Product: "hgt", MonthSales: 19 },
    { Date: "2/11/2024", Product: "ooo", MonthSales: 17 },
    { Date: "6/10/2024", Product: "eee", MonthSales: 13 },
    { Date: "11/11/2024", Product: "ghh", MonthSales: 5 },
    { Date: "17/10/2024", Product: "ytt", MonthSales: 17 },
    { Date: "2/10/2024", Product: "qyy", MonthSales: 10 },
  ];
  useEffect(() => {
    setData(sampleData);
  }, [])


  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  function handleDataParse(newData: DataObject[]) {
    const parsedData = newData.map(item => ({
      ...item,
      MonthSales: Number(item.MonthSales),
    }));

    console.log(parsedData);
    setData(parsedData);
  }
  return (
    <>
      <div className="flex flex-col items-center laptop:justify-center laptop:flex-row laptop:p-4">
        <div className="mt-3 laptop:mt-0">
          <DataInput onDataParse={handleDataParse} />
        </div>
        <div className="w-11/12 ml-2">
          <MixedChart data={data} />
        </div>
      </div>

    </>
  )
}

export default App
