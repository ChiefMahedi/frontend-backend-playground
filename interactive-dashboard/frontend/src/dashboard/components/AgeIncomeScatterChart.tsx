/* eslint-disable react-hooks/exhaustive-deps */
import { Chart, ChartConfiguration } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
interface CustomerData {
    ID: string,
    CustomerName: string,
    Division: string,
    Gender: string,
    MaritalStatus: string,
    Age: number,
    Income: number
}
interface AgeIncomeScatterChartProps {
    data: CustomerData[]
}
export default function AgeIncomeScatterChart(ageIncomeProps: AgeIncomeScatterChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const context = chartRef.current?.getContext('2d');
        const ageGroups = ageIncomeProps.data.map(customer => ({
            x: customer.Age,
            y: customer.Income,
        }));

        const data = {
            datasets: [
                {
                    label: 'Age vs Income',
                    data: ageGroups,
                    backgroundColor: '#f29811',
                },
            ],
        };

        const config: ChartConfiguration = {
            type: 'scatter',
            data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Age',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Income',
                        },
                    },
                },
            },
        };

        const chartInstance = new Chart(context as CanvasRenderingContext2D, config);

        return () => {
            chartInstance.destroy();
        };
    }, [ageIncomeProps]);
    return (
        <>
            <div className="w-82 laptop:w-6/12 border shadow-2xl m-3 p-2 rounded flex flex-col">
                <div className="p-1">
                    <FontAwesomeIcon icon={faMoneyBillTrendUp} className="text-2xl text-green-800" />
                </div>
                <h3 className="font-semibold p-1 self-center text-sm font-poppins">Income Distribution by Customer Age</h3>
                <div>
                    <canvas ref={chartRef} />
                </div>
            </div>
        </>
    )
}