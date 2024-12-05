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
interface MaritalStatusIncomePieChart {
    data: CustomerData[]
}

export default function MaritalStatusIncomePieChart(props: MaritalStatusIncomePieChart) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const maritalStatusData = props.data.reduce<Record<string, number>>((acc, customer) => {
        acc[customer.MaritalStatus] = (acc[customer.MaritalStatus] || 0) + customer.Income;
        return acc;
    }, {})
    const maritalStatusLabels = Object.keys(maritalStatusData);
    const maritalStatusValues = Object.values(maritalStatusData);
    useEffect(() => {
        console.log(maritalStatusLabels)
        console.log(maritalStatusValues)
        const context = chartRef.current?.getContext('2d');
        const chartData = {
            labels: maritalStatusLabels,
            datasets: [
                {
                    label: "Gender Distribution",
                    data: maritalStatusValues,
                    backgroundColor: ["#0A3981", "#FA812F", "#FA4032"],
                },
            ],
        };

        const config: ChartConfiguration = {
            type: "pie",
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
    }, [props]);

    return (
        <>
            <div className="w-56 laptop:w-96 border shadow-2xl m-3 p-1 rounded flex flex-col">
                <div className="p-1">
                    <FontAwesomeIcon icon={faVenusMars} className="text-2xl text-sidebar" />
                </div>
                <h3 className="font-semibold p-1 self-center text-sm font-poppins">Total Income by Marital Status</h3>
                <div className="h-48">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </>
    )
}