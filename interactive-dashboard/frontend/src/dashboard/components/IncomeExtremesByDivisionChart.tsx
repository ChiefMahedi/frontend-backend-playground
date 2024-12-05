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
interface IncomeExtremesByDivisionProps {
    data: CustomerData[]
}

export default function IncomeExtremesByDivisionChart(props: IncomeExtremesByDivisionProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    //
    const divisionHighestIncomeMap = new Map();
    const divisionLowestIncomeMap = new Map();
    for (let i = 0; i < props.data.length; i++) {
        if (divisionHighestIncomeMap.get(props.data[i].Division)) {
            if (divisionHighestIncomeMap.get(props.data[i].Division) < props.data[i].Income) {
                divisionHighestIncomeMap.set(props.data[i].Division, props.data[i].Income)
            }
        }
        else divisionHighestIncomeMap.set(props.data[i].Division, props.data[i].Income)

        if (divisionLowestIncomeMap.get(props.data[i].Division)) {
            if (divisionLowestIncomeMap.get(props.data[i].Division) > props.data[i].Income) {
                divisionLowestIncomeMap.set(props.data[i].Division, props.data[i].Income)
            }
        }
        else divisionLowestIncomeMap.set(props.data[i].Division, props.data[i].Income)
    }
    const divisions = Array.from(divisionHighestIncomeMap.keys());
    const highestIncomes = Array.from(divisionHighestIncomeMap.values());
    const lowestIncomes = Array.from(divisionLowestIncomeMap.values());
    useEffect(() => {
        const context = chartRef.current?.getContext('2d');
        const chartData = {
            labels: divisions,
            datasets: [
                {
                    type: "line",
                    label: "Highest Income",
                    data: highestIncomes,
                    backgroundColor: "#03366e",
                    borderColor: "#03366e",
                    borderWidth: 1,
                    order: 2,
                },
                {
                    type: "line",
                    label: "Lowest Income",
                    data: lowestIncomes,
                    borderColor: "#eab308",
                    backgroundColor: "#eab308",
                    borderWidth: 2,
                    fill: false,
                    order: 1,
                    pointStyle: "circle",
                    pointRadius: 3,
                },
            ],
        };

        const config = {
            data: chartData,
        }
        const chartInstance = new Chart(context as ChartItem, config as ChartConfiguration);
        return () => {
            chartInstance.destroy();
        }
    }, [props]);

    return (
        <>
            <div className="w-82 laptop:w-96 border shadow-2xl m-3 p-2 rounded flex flex-col">
                <div className="p-1">
                    <FontAwesomeIcon icon={faMoneyBill} className="text-2xl text-green-800" />
                </div>
                <h3 className="font-semibold p-1 self-center text-sm font-poppins">Income Extremes from Customers by Division</h3>
                <div>
                    <canvas ref={chartRef} />
                </div>
            </div>
        </>
    )
}