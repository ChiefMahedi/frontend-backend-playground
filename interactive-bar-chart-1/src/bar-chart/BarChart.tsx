import { Chart, ChartItem, ChartConfiguration } from "chart.js/auto";
import { useEffect, useRef } from "react";

interface BarChartProps {
    data: { Product: string, TotalValue: number, TotalSales: number }[];
}
export default function BarChart(barChartProps: BarChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const context = chartRef.current?.getContext('2d');
        //Set up the chart data
        const chartData = {
            //On X-AXIS ==> Product
            labels: barChartProps.data.map(item => item.Product),
            datasets: [
                {
                    //On Y-AXIS ==> Total Sales
                    label: 'Total Sales',
                    data: barChartProps.data.map(item => item.TotalSales),
                    //TODO = > Set up color based on TotalValue
                    //backgroundColor: 
                }
            ]
        };
        //Configure Chart
        const config = {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Product'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Sales'
                        }
                    },
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        }

        //Create the Chart Instance
        const chartInstance = new Chart(context as ChartItem, config as ChartConfiguration);
        return () => {
            chartInstance.destroy();
        };
    }, [barChartProps]);
    return (
        <>
            <div className="flex">
                <div className="w-10/12">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </>
    )
}