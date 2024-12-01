import { useEffect, useRef } from "react";
import { Chart, ChartItem, ChartConfiguration } from "chart.js/auto";

type SalesData = {
  Date: string;
  Product: string;
  MonthSales: number;
};
interface MixedChartProps {
  data: SalesData[];
}
export default function MixedChart(mixedDataProps: MixedChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Extract unique months from data
    const uniqueMonths = (() => {
      const monthYearArray = mixedDataProps.data.map((row) => {
        const [, month, year] = row.Date.split("/");
        return `${month}/${year}`;
      });

      const uniqueMonthYears = Array.from(new Set(monthYearArray));
      console.log('Unique months', uniqueMonthYears)
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

    mixedDataProps.data.forEach((row) => {
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
    console.log('Current month sales', currentMonthSales);
    console.log('Previous month sales', previousMonthSales);
    const labels = currentMonthData.map((item) => item.Product);

    const context = chartRef.current?.getContext("2d");
    const options = {
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
    }
    const mixedChart = new Chart(context as ChartItem, options as unknown as ChartConfiguration);


    const handleLegendClick = (datasetIndex: number) => {
      const meta = mixedChart.getDatasetMeta(datasetIndex);
      meta.hidden = meta.hidden === null ? !mixedChart.data.datasets[datasetIndex].hidden : false;
      mixedChart.update();
    };

    // Create custom legend HTML and bind click events
    const customLegendHtml = ` 
<div class="flex justify-center flex-col space-y-4 p-4">
  <!-- Current Month Sales -->
  <div class="flex items-center space-x-2 cursor-pointer" id="legend-item-0">
    <span class="w-4 h-4 ml-2 mr-3 bg-blue-600"></span>
    <span class="text-gray-800 text-sm">Current Month Sales</span>
  </div>
  
  <!-- Previous Month Sales -->
  <div class="flex w-64 items-center space-x-2 cursor-pointer" id="legend-item-1">
    <div class="flex items-center">
      <span class="w-3 h-1 bg-red-600"></span>
      <span class="w-3 h-3 rounded-full bg-red-600"></span>
      <span class="w-3 h-1 bg-red-600"></span>
    </div>
    <span class="text-gray-800 text-sm">Previous Month Sales</span>
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
  }, [mixedDataProps]);

  return (
    <div className="flex flex-col laptop:flex-row mt-5">
      <div className="w-11/12 self-center ">
        <canvas ref={chartRef} />
      </div>
      <div id="legend-container" ref={legendRef} className="self-center laptop:self-start"></div>
    </div>
  );
}
