/* eslint-disable react-hooks/exhaustive-deps */
import { Chart, ChartItem, ChartConfiguration } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
interface CustomerData {
  ID: string,
  CustomerName: string,
  Division: string,
  Gender: string,
  MaritalStatus: string,
  Age: number,
  Income: number
}
interface TotalIncomeBarChartProps {
  data: CustomerData[]
}
export default function TotalIncomeBarChart(props: TotalIncomeBarChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const totalIncomeByDivisionMap = new Map();
  for (let i = 0; i < props.data.length; i++) {
    if (totalIncomeByDivisionMap.get(props.data[i].Division)) {
      totalIncomeByDivisionMap.set(props.data[i].Division, totalIncomeByDivisionMap.get(props.data[i].Division) + props.data[i].Income);
    }
    else totalIncomeByDivisionMap.set(props.data[i].Division, props.data[i].Income);
  }
  const totalIncomes = Array.from(totalIncomeByDivisionMap.values());
  const divisions = Array.from(totalIncomeByDivisionMap.keys());


  useEffect(() => {
    const context = chartRef.current?.getContext('2d');
    const chartData = {
      labels: divisions,
      datasets: [{
        label: 'Total Income from Divisions',
        data: totalIncomes,
        backgroundColor: [
          '#03366e'
        ],
      }]
    };
    const config = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    const chartInstance = new Chart(context as ChartItem, config as ChartConfiguration);
    return () => {
      chartInstance.destroy();
    }
  }, [props]);

  return (
    <>
      <div className="w-86 laptop:w-6/12 border shadow-2xl m-3 p-2 rounded flex flex-col">
        <div className="p-1">
          <FontAwesomeIcon icon={faMoneyBill} className="text-2xl text-green-800" />
        </div>
        <h3 className="font-semibold p-1 self-center text-sm font-poppins">Incomes from Divisions</h3>
        <div>
          <canvas ref={chartRef} />
        </div>
      </div>
    </>
  )
}