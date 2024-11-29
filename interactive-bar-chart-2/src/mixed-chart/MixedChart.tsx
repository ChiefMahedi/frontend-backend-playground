import { useEffect, useRef} from "react";
import { Chart, ChartItem } from "chart.js/auto";

type SalesData = {
  Date: string;
  Product: string;
  MonthSales: number;
};

export default function MixedChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const data: SalesData[] = [
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

    // Extract unique months from data
    const uniqueMonths = (() => {
      const monthYearArray = data.map((row) => {
        const [, month, year] = row.Date.split("/"); 
        return `${month}/${year}`; 
      });
    
      const uniqueMonthYears = Array.from(new Set(monthYearArray));
    
      const sortedUniqueMonths = uniqueMonthYears.sort((a, b) => {
        const [monthA, yearA] = a.split("/").map(Number);
        const [monthB, yearB] = b.split("/").map(Number);
    
        if (yearA === yearB) return monthA - monthB; 
        return yearA - yearB; 
      });
    
      return sortedUniqueMonths;
    })();
    

    const currentMonth = uniqueMonths[uniqueMonths.length - 1];
    const previousMonth = uniqueMonths[uniqueMonths.length - 2];

    const currentMonthData: SalesData[] = [];
    const previousMonthData: SalesData[] = [];

    data.forEach((row) => {
      const rowMonth = row.Date.split("/").slice(1, 3).join("/");
      if (rowMonth === currentMonth) {
        currentMonthData.push(row);
      } else if (rowMonth === previousMonth) {
        previousMonthData.push(row);
      }
    });

    currentMonthData.sort((a, b) => a.Product.localeCompare(b.Product));
    previousMonthData.sort((a, b) => a.Product.localeCompare(b.Product));

    const currentMonthSales = currentMonthData.map((item) => item.MonthSales);
    const previousMonthSales = previousMonthData.map((item) => item.MonthSales);
    const labels = currentMonthData.map((item) => item.Product);

    const context = chartRef.current?.getContext("2d");
    const mixedChart = new Chart(context as ChartItem, {
      data: {
        labels,
        datasets: [
          {
            type: "bar",
            label: "Current Month Sales",
            data: currentMonthSales,
            backgroundColor: "#0317fc",
            borderColor: "#0317fc",
            borderWidth: 1,
            order: 2,
          },
          {
            type: "line",
            label: "Previous Month Sales",
            data: previousMonthSales,
            borderColor: "#fc2803",
            backgroundColor: "#fc2803",
            borderWidth: 2,
            fill: false,
            order: 1,
            pointStyle: "circle",
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          htmlLegend: {
            containerID: "legend-container",
          },
        },
      },
    });


    const handleLegendClick = (datasetIndex: number) => {
      const meta = mixedChart.getDatasetMeta(datasetIndex);
      meta.hidden = meta.hidden === null ? !mixedChart.data.datasets[datasetIndex].hidden : null;
      mixedChart.update();
    };

    // Create custom legend HTML and bind click events
    const customLegendHtml = ` 
      <div class="flex justify-center flex-col space-x-6 p-4">
        <div class="flex items-center space-x-2 cursor-pointer" id="legend-item-0">
          <span class="w-6 h-6 bg-blue-600"></span>
          <span class="text-gray-800">Current Month Sales</span>
        </div>
        <div class="flex items-center  cursor-pointer" id="legend-item-1">
           <span class="w-3 h-1 bg-red-600"></span>
          <span class="w-3 h-3 rounded-full bg-red-600"></span>
             <span class="w-3 h-1 bg-red-600"></span>
          <span class="text-gray-800">Previous Month Sales</span>
        </div>
      </div>
    `;

    // Insert custom legend HTML into the specified container
    if (legendRef.current) {
      legendRef.current.innerHTML = customLegendHtml;

      const legendItem0 = document.getElementById("legend-item-0");
      const legendItem1 = document.getElementById("legend-item-1");

      if (legendItem0) {
        legendItem0.addEventListener("click", () => handleLegendClick(0));
      }
      if (legendItem1) {
        legendItem1.addEventListener("click", () => handleLegendClick(1));
      }
    }

    return () => {
      mixedChart.destroy();
    };
  }, []);

  return (
    <div className="flex">
      <div className="w-10/12">
        <canvas ref={chartRef} />
      </div>

      <div id="legend-container" ref={legendRef}></div>
    </div>
  );
}
