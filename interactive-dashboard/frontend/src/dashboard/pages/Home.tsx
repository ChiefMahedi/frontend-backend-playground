/* eslint-disable react-hooks/exhaustive-deps */
import { faMap, faMoneyBill, faPeopleLine } from "@fortawesome/free-solid-svg-icons";
import AgeIncomeScatterChart from "../components/AgeIncomeScatterChart";
import IncomeExtremesByDivisionChart from "../components/IncomeExtremesByDivisionChart";
import GenderDistributionChart from "../components/GenderDistributionChart";
import StatsCard from "../components/StatsCard";
import TotalIncomeBarChart from "../components/TotalIncomeBarChart";
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState } from "react";
import MaritalStatusIncomePieChart from "../components/MaritalStatusIncomePieChart";

interface CustomerData {
    ID: string,
    CustomerName: string,
    Division: string,
    Gender: string,
    MaritalStatus: string,
    Age: number,
    Income: number
}

export default function Home() {
    const navigate = useNavigate();
    const [totalCustomer, setTotalCustomer] = useState<string>('');
    const [totalIncome, setTotalIncome] = useState<string>('');
    const [lowIncomeDiv, setLowIncomeDiv] = useState<string>('');
    const [highIncomeDiv, setHighIncomeDiv] = useState<string>('');
    const [customerData, setCustomerData] = useState<CustomerData[]>([]);
    const customers: CustomerData[] = [
        { ID: "BU79786", CustomerName: "Andrew", Division: "Dhaka", Gender: "F", MaritalStatus: "Married", Age: 31, Income: 56274 },
        { ID: "QZ44356", CustomerName: "Anne", Division: "Rajshahi", Gender: "F", MaritalStatus: "Single", Age: 46, Income: 0 },
        { ID: "AI49188", CustomerName: "Anthony", Division: "Khulna", Gender: "F", MaritalStatus: "Married", Age: 43, Income: 48767 },
        { ID: "WW63253", CustomerName: "Barbara", Division: "Barishal", Gender: "M", MaritalStatus: "Married", Age: 36, Income: 0 },
        { ID: "HB64268", CustomerName: "Brian", Division: "Mymensingh", Gender: "M", MaritalStatus: "Single", Age: 35, Income: 43836 },
        { ID: "OC83172", CustomerName: "Bruce", Division: "Sylhet", Gender: "F", MaritalStatus: "Married", Age: 41, Income: 62902 },
        { ID: "XZ87318", CustomerName: "Carol", Division: "Khulna", Gender: "F", MaritalStatus: "Married", Age: 26, Income: 55350 },
        { ID: "CF85061", CustomerName: "Christine", Division: "Barishal", Gender: "M", MaritalStatus: "Single", Age: 25, Income: 0 },
        { ID: "DY87989", CustomerName: "Christopher", Division: "Mymensingh", Gender: "M", MaritalStatus: "Divorced", Age: 24, Income: 14072 },
        { ID: "BQ94931", CustomerName: "Craig", Division: "Sylhet", Gender: "F", MaritalStatus: "Married", Age: 26, Income: 28812 },
        { ID: "SX51350", CustomerName: "David", Division: "Rangpur", Gender: "M", MaritalStatus: "Single", Age: 24, Income: 0 },
        { ID: "VQ65197", CustomerName: "Diane", Division: "Chattogram", Gender: "F", MaritalStatus: "Married", Age: 27, Income: 0 },
        { ID: "DP39365", CustomerName: "Elizabeth", Division: "Dhaka", Gender: "M", MaritalStatus: "Married", Age: 28, Income: 77026 },
        { ID: "SJ95423", CustomerName: "Grant", Division: "Rajshahi", Gender: "M", MaritalStatus: "Married", Age: 40, Income: 99845 },
        { ID: "IL66569", CustomerName: "Gregory", Division: "Khulna", Gender: "M", MaritalStatus: "Single", Age: 32, Income: 83689 },
        { ID: "BW63560", CustomerName: "Heather", Division: "Barishal", Gender: "F", MaritalStatus: "Married", Age: 30, Income: 24599 },
        { ID: "FV94802", CustomerName: "Helen", Division: "Mymensingh", Gender: "M", MaritalStatus: "Married", Age: 50, Income: 25049 },
        { ID: "OE15005", CustomerName: "Ian", Division: "Sylhet", Gender: "M", MaritalStatus: "Married", Age: 24, Income: 28855 },
        { ID: "WC83389", CustomerName: "James", Division: "Rangpur", Gender: "M", MaritalStatus: "Married", Age: 39, Income: 51148 },
        { ID: "FL50705", CustomerName: "Janet", Division: "Chattogram", Gender: "F", MaritalStatus: "Married", Age: 38, Income: 66140 },
        { ID: "ZK25313", CustomerName: "Janice", Division: "Dhaka", Gender: "M", MaritalStatus: "Single", Age: 33, Income: 57749 },
        { ID: "SV62436", CustomerName: "Jennifer", Division: "Rajshahi", Gender: "F", MaritalStatus: "Divorced", Age: 31, Income: 13789 },
        { ID: "YH23384", CustomerName: "John", Division: "Mymensingh", Gender: "M", MaritalStatus: "Divorced", Age: 36, Income: 14072 },
        { ID: "TZ98966", CustomerName: "Judith", Division: "Sylhet", Gender: "F", MaritalStatus: "Single", Age: 28, Income: 0 },
        { ID: "HM55802", CustomerName: "Julie", Division: "Rangpur", Gender: "F", MaritalStatus: "Married", Age: 49, Income: 17870 },
        { ID: "FS42516", CustomerName: "Karen", Division: "Chattogram", Gender: "M", MaritalStatus: "Married", Age: 34, Income: 97541 },
        { ID: "US89481", CustomerName: "Kevin", Division: "Dhaka", Gender: "F", MaritalStatus: "Single", Age: 46, Income: 0 },
        { ID: "HO30839", CustomerName: "Linda", Division: "Rajshahi", Gender: "F", MaritalStatus: "Married", Age: 32, Income: 10511 },
        { ID: "GE62437", CustomerName: "Lorraine", Division: "Khulna", Gender: "F", MaritalStatus: "Single", Age: 26, Income: 86584 },
        { ID: "EJ77678", CustomerName: "Lynette", Division: "Rangpur", Gender: "F", MaritalStatus: "Married", Age: 49, Income: 75690 },
        { ID: "SV85652", CustomerName: "Margaret", Division: "Chattogram", Gender: "M", MaritalStatus: "Married", Age: 38, Income: 23158 },
        { ID: "UL64533", CustomerName: "Mark", Division: "Dhaka", Gender: "M", MaritalStatus: "Married", Age: 46, Income: 65999 },
        { ID: "PF41800", CustomerName: "Mary", Division: "Rajshahi", Gender: "M", MaritalStatus: "Married", Age: 28, Income: 0 },
        { ID: "AO98601", CustomerName: "Michael", Division: "Khulna", Gender: "M", MaritalStatus: "Married", Age: 45, Income: 54500 },
        { ID: "SK67821", CustomerName: "Pamela", Division: "Barishal", Gender: "F", MaritalStatus: "Married", Age: 27, Income: 37260 },
        { ID: "YV55495", CustomerName: "Patricia", Division: "Mymensingh", Gender: "F", MaritalStatus: "Married", Age: 41, Income: 68987 },
        { ID: "KY38074", CustomerName: "Paul", Division: "Sylhet", Gender: "M", MaritalStatus: "Married", Age: 33, Income: 42305 },
        { ID: "DM79012", CustomerName: "Peter", Division: "Rangpur", Gender: "F", MaritalStatus: "Married", Age: 45, Income: 65706 },
        { ID: "CM61827", CustomerName: "Philip", Division: "Chattogram", Gender: "M", MaritalStatus: "Single", Age: 40, Income: 0 },
        { ID: "WC35801", CustomerName: "Richard", Division: "Khulna", Gender: "M", MaritalStatus: "Divorced", Age: 26, Income: 53243 },
        { ID: "QG25316", CustomerName: "Robert", Division: "Rangpur", Gender: "F", MaritalStatus: "Married", Age: 49, Income: 0 },
        { ID: "MB98372", CustomerName: "Robyn", Division: "Chattogram", Gender: "F", MaritalStatus: "Single", Age: 47, Income: 50071 },
        { ID: "IL19217", CustomerName: "Sandra", Division: "Dhaka", Gender: "F", MaritalStatus: "Married", Age: 42, Income: 60021 },
        { ID: "SR38658", CustomerName: "Stephen", Division: "Rajshahi", Gender: "M", MaritalStatus: "Married", Age: 26, Income: 43244 },
        { ID: "DH39433", CustomerName: "Steven", Division: "Sylhet", Gender: "M", MaritalStatus: "Single", Age: 31, Income: 67005 },
        { ID: "LK92661", CustomerName: "Susan", Division: "Mymensingh", Gender: "M", MaritalStatus: "Married", Age: 48, Income: 98640 },
        { ID: "IS78530", CustomerName: "Thomas", Division: "Chattogram", Gender: "F", MaritalStatus: "Married", Age: 29, Income: 0 },
        { ID: "AG97862", CustomerName: "Timothy", Division: "Dhaka", Gender: "M", MaritalStatus: "Married", Age: 25, Income: 34721 },
    ];
    console.log(customerData)
    function getTotalCustomers(customerData:CustomerData[]) {
        return customerData.length;
    }
    function totalIncomeAmount(customerData:CustomerData[]) {
        let sum = 0;
        for (let i = 0; i < customerData.length; i++) {
            sum += customerData[i].Income;
        }
        return sum;
    }
    function getHighestIncomeDivision(customerData:CustomerData[]) {
        const divisionIncomeMap: { [key: string]: number } = {};

        customerData.forEach(customer => {
            if (!divisionIncomeMap[customer.Division]) {
                divisionIncomeMap[customer.Division] = 0;
            }
            divisionIncomeMap[customer.Division] += customer.Income;
        });

        let highestIncomeDivision = '';
        let highestIncome = 0;

        for (const division in divisionIncomeMap) {
            if (divisionIncomeMap[division] > highestIncome) {
                highestIncome = divisionIncomeMap[division];
                highestIncomeDivision = division;
            }
        }

        return highestIncomeDivision;
    }

    function getLowestIncomeDivision(customerData:CustomerData[]) {
        const divisionIncomeMap: { [key: string]: number } = {};

        customerData.forEach(customer => {
            if (!divisionIncomeMap[customer.Division]) {
                divisionIncomeMap[customer.Division] = 0;
            }
            divisionIncomeMap[customer.Division] += customer.Income;
        });

        let lowestIncomeDivision = '';
        let lowestIncome = Infinity;

        for (const division in divisionIncomeMap) {
            if (divisionIncomeMap[division] < lowestIncome) {
                lowestIncome = divisionIncomeMap[division];
                lowestIncomeDivision = division;
            }
        }

        return lowestIncomeDivision;
    }

    useEffect(() => {
        if (import.meta.env.VITE_ENV == 'LOCAL') {
            fetch("http://localhost:3000/customers")
                .then(response => response.json())
                .then((parsed)=>{
                    console.log(parsed)
                    setCustomerData(parsed);
                })
                .catch((e) => {
                    console.error(e);
                })

        }
        else
        {
            setCustomerData(customers);
        }
        if(customerData.length >0)
        {
            const customerCount = getTotalCustomers(customerData);
            console.log(customerCount)
            setTotalCustomer(String(customerCount));
    
            const incomeCount = totalIncomeAmount(customerData);
            setTotalIncome(`BDT. ${incomeCount}`);
    
            console.log(`Total customers: ${customerCount}`);
            console.log(`Total income: ${incomeCount}`);
    
            const highestIncomeDivision = getHighestIncomeDivision(customerData);
            setLowIncomeDiv(highestIncomeDivision);
            console.log("Division with the highest total income: ", highestIncomeDivision);
    
            const lowestIncomeDivision = getLowestIncomeDivision(customerData);
            setHighIncomeDiv(lowestIncomeDivision);
            console.log("Division with the lowest total income: ", lowestIncomeDivision);
        }

    }, [customerData.length]);


    return (
        <>
            <div className="flex flex-col">
                <h1 className="font-semibold ml-7 mt-12 laptop:mt-3 laptop:self-start antialiased text-lg font-poppins self-center">Analytical Dashboard</h1>
                <div className="self-center laptop:self-start">
                    <Breadcrumbs mainPage="Home" parentPage="Dashboard" onClickMainPage={() => navigate('/')}
                        onClickParentPage={() => navigate('/')} />
                </div>

                <div className="flex flex-col items-center laptop:justify-between laptop:flex-row desktop:justify-evenly">
                    <StatsCard icon={faMoneyBill} label="Total Income" number={totalIncome} />
                    <StatsCard icon={faPeopleLine} label="Total Customers" number={totalCustomer} />
                    <StatsCard icon={faMap} label="Highest Income Division" number={lowIncomeDiv} />
                    <StatsCard icon={faMap} label="Lowest Income Division" number={highIncomeDiv} />
                </div>
                <div className="flex flex-col items-center justify-evenly laptop:flex-row">
                    <TotalIncomeBarChart data={customerData} />
                    <AgeIncomeScatterChart data={customerData} />
                </div>
                <div className="flex-col items-center desktop:justify-center laptop:flex-row laptop:flex flex laptop:justify-evenly laptop:items-center">
                    <GenderDistributionChart data={customerData} />
                    <IncomeExtremesByDivisionChart data={customerData} />
                    <MaritalStatusIncomePieChart data={customerData} />
                </div>
            </div>

        </>
    )
}