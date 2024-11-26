import BarChart from "./bar-chart/BarChart";

function App() {
  const sampleData = [
    { Product: 'aaa', TotalValue: 10, TotalSales: 10 },
    { Product: 'ooo', TotalValue: 17, TotalSales: 8 },
    { Product: 'rtt', TotalValue: 23, TotalSales: 4 },
    { Product: 'ghh', TotalValue: 40, TotalSales: 15 },
    { Product: 'dww', TotalValue: 30, TotalSales: 10 },
    { Product: 'ytt', TotalValue: 26, TotalSales: 7 },
    { Product: 'eee', TotalValue: 15, TotalSales: 7 },
    { Product: 'qyy', TotalValue: 18, TotalSales: 7 },
    { Product: 'prp', TotalValue: 20, TotalSales: 7 },
    { Product: 'hgt', TotalValue: 40, TotalSales: 7 },
  ];

  // Generate 50 more sample data entries
  for (let i = 0; i < 50; i++) {
    const randomProduct = `Product${i + 11}`;  // Generates Product11, Product12, etc.
    const randomTotalValue = Math.floor(Math.random() * 51) + 10;  // Random TotalValue between 10 and 60
    const randomTotalSales = Math.floor(Math.random() * 20) + 1;  // Random TotalSales between 1 and 20

    sampleData.push({
      Product: randomProduct,
      TotalValue: randomTotalValue,
      TotalSales: randomTotalSales,
    });
  }

  console.log(sampleData);
  const sortedData = sampleData.slice().sort((a, b) => {
    // First sort by TotalSales in descending order
    if (b.TotalSales !== a.TotalSales) {
      return b.TotalSales - a.TotalSales;
    } // If TotalSales is the same, sort by TotalValue in descending order
    return b.TotalValue - a.TotalValue;
  });
  console.log('Sorted data', sortedData);
  return (
    <div>
      <BarChart data={sortedData} />
    </div>
  );
}

export default App;
