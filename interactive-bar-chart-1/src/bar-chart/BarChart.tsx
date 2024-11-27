/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart, ChartItem, ChartConfiguration } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { interpolateOranges } from "d3-scale-chromatic";
import ColorScale from "./components/ColorScale";
interface DataObject {
    Product: string;
    TotalValue: number;
    TotalSales: number;
}
interface BarChartProps {
    data: DataObject[];
}

interface colorRangeInfo {
    colorStart: number;
    colorEnd: number;
    useEndAsStart: boolean;
}
export default function BarChart(barChartProps: BarChartProps) {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [colorMap, setColorMap] = useState<Map<number, string>>(new Map());

    useEffect(() => {
        console.log('a', barChartProps)
        const context = chartRef.current?.getContext('2d');
        const colorScale = interpolateOranges;
        const colorRangeInfo = {
            colorStart: 0.1,
            colorEnd: 1,
            useEndAsStart: false,
        };
        //Slice the main array to make a shallow copy
        const sortedDataBasedOnTotalValue = barChartProps.data.slice().sort((a, b) => a.TotalValue - b.TotalValue);
        const COLORS = interpolateColors(colorScale, colorRangeInfo, sortedDataBasedOnTotalValue[0].TotalValue, sortedDataBasedOnTotalValue[sortedDataBasedOnTotalValue.length - 1].TotalValue);
        console.log('COLORS: ', COLORS.colorMap)
        //Set up the chart data
        const chartData = {
            //On X-AXIS ==> Product
            labels: barChartProps.data.map(item => item.Product),
            datasets: [
                {
                    //On Y-AXIS ==> Total Sales
                    label: 'Total Sales',
                    data: barChartProps.data.map(item => item.TotalSales),
                    //Set up colors according to the TotalValue to Color Mapping
                    backgroundColor: barChartProps.data.map(item => COLORS.colorMap.get(item.TotalValue)),

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
                        display: false
                    }, tooltip: {
                        callbacks: {
                            title: function (tooltipItems: { dataIndex: any; }[]) {
                                // Display the product name as the tooltip title
                                const index = tooltipItems[0].dataIndex;
                                return `Product: ${barChartProps.data[index].Product}`;
                            },
                            label: function (context: { dataIndex: any; }) {
                                // Display TotalValue
                                const index = context.dataIndex;
                                return `Total Value: ${barChartProps.data[index].TotalValue}`;
                            },
                            afterLabel: function (context: { dataIndex: any; }) {
                                // Display TotalSales
                                const index = context.dataIndex;
                                return `Total Sales: ${barChartProps.data[index].TotalSales}`;
                            }
                        }
                    }
                }
            }
        }
        //
        // Determine the color based on TotalValue for each bar
        function calculatePoint(i: number, intervalSize: number, colorRangeInfo: any) {
            const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
            return useEndAsStart
                ? colorEnd - i * intervalSize
                : colorStart + i * intervalSize;
        }
        function interpolateColors(colorScale: (n: number) => string, colorRangeInfo: colorRangeInfo, start: number, end: number) {

            const { colorStart, colorEnd } = colorRangeInfo;
            const colorRange = colorEnd - colorStart;
            const intervalSize = colorRange / (end - start + 1);
            const colorArray = [];
            const colorMap = new Map();
            // Generate color array and map the color to TotalSales based on position in sortedData
            for (let i = start, j = 0; i <= end; i++, j++) {
                const colorPoint = calculatePoint(j, intervalSize, colorRangeInfo);
                const color = colorScale(colorPoint);
                colorArray.push(color);
                colorMap.set(i, color);

            }
            setColorMap(colorMap);
            return { colorArray, colorMap };
        }


        //Create the Chart Instance
        const chartInstance = new Chart(context as ChartItem, config as ChartConfiguration);
        return () => {
            chartInstance.destroy();
        };
    }, [barChartProps]);
    return (
        <>
            <div className="flex gap-3">
                <div className="w-10/12">
                    <canvas ref={chartRef} />
                </div>
                <div>
                    <ColorScale COLORS={colorMap} />
                </div>
            </div>
        </>
    )
}