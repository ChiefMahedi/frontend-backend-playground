/* eslint-disable react-hooks/exhaustive-deps */
import { Chart, ChartItem, ChartConfiguration } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenusMars } from "@fortawesome/free-solid-svg-icons";

interface CustomerData {
    ID: string,
    CustomerName: string,
    Division: string,
    Gender: string,
    MaritalStatus: string,
    Age: number,
    Income: number
}
interface GenderDistributionChartProps {
    data: CustomerData[]
}

export default function GenderDistributionChart(props: GenderDistributionChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const genderData = props.data.reduce<Record<string, number>>((acc, customer) => {
        acc[customer.Gender] = (acc[customer.Gender] || 0) + 1;
        return acc;
    }, {})
    const genderLabels = Object.keys(genderData);
    const genderValues = Object.values(genderData);
    useEffect(() => {
        console.log(genderLabels)
        console.log(genderValues)
        const context = chartRef.current?.getContext('2d');
        const chartData = {
            labels: genderLabels,
            datasets: [
                {
                    label: "Gender Distribution",
                    data: genderValues,
                    backgroundColor: ["#FF6384", "#03366e"],
                },
            ],
        };

        const config: ChartConfiguration = {
            type: "doughnut",
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 2,
                },
            },
        };

        const chartInstance = new Chart(context as ChartItem, config);

        return () => {
            chartInstance.destroy();
        };
    }, []);

    return (
        <>
            <div className="w-48 border shadow-2xl m-3 p-2 rounded flex flex-col">
                <div className="p-1">
                    <FontAwesomeIcon icon={faVenusMars} className="text-2xl text-sidebar" />
                </div>
                <h3 className="font-semibold p-1 self-center text-sm font-poppins">Gender Distribution of Customers</h3>
                <div className="h-40">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </>
    )
}