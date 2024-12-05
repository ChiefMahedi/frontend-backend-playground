Technologies used : React.js, Chart.js, TailwindCss, Node.js, Express.js, TypeScript, etc

# Interactive Bar Chart 1 - 1(a)

This bar chart can be used to visualize data with three variables: TotalSales, Product, and TotalValue. The x-axis represents the product, the y-axis represents TotalSales, and the intensity of the bar color is based on TotalValue.
## Demo

You can view the live demo of the project here:  
[Live Demo](https://frontend-backend-playground.vercel.app/)

## Installation

To get started with this project, follow the steps below.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Node.js v18.17.0)

### Step-by-Step Installation

1. **Clone the repository**

   Run the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/ChiefMahedi/frontend-backend-playground.git
2. **Change directory**
   ```bash
   cd interactive-bar-chart-1
3. **Install required packages**
   ```bash
   npm install
4. **Run the app**
   ```bash
   npm run dev

Access the app on: http://localhost:5173/ (Make sure no the other service is running on port 5173)

# Interactive Bar Chart 2 - 1(b)

This bar chart visualizes the sales data of products for the current and previous months, using three variables: Date, MonthSales, and Product. The x-axis represents the product, while the y-axis represents MonthSales. Two rows are displayed for each product, one for the current month's sales and one for the previous month's sales, with MonthSales potentially differing between the two. The line chart represents the previous month's sales, and the bar chart represents the current month's sales.
## Demo

You can view the live demo of the project here:  
[Live Demo](https://frontend-backend-playground-3clm.vercel.app/)

## Installation

To get started with this project, follow the steps below.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Node.js v18.17.0)

### Step-by-Step Installation

1. **Clone the repository**

   Run the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/ChiefMahedi/frontend-backend-playground.git
2. **Change directory**
   ```bash
   cd interactive-bar-chart-2
3. **Install required packages**
   ```bash
   npm install
4. **Run the app**
   ```bash
   npm run dev

Access the app on: http://localhost:5173/ (Make sure no the other service is running on port 5173)

# Analytical Dashboard - Interactive Dashboard

This dashboard application primarily focuses on the frontend and displays several key metrics on the home page. These metrics are based on data with the following columns: ID, CustomerName, Division, Gender, Age, Marital Status, and Income. The dashboard includes visualizations such as:

1. Scatter plot of Income by Age group
2. Gender distribution chart
3. Income extremes by Division
4. Income by Marital Status
5. Total Income by Division
6. Other statistical cards

Additionally, the application has the capability to send emails to customers using Email.js. To enable this feature, you must create an account on Email.js and collect the Service Key, Public Key, and Email Template Key. These keys should be added to the .env file to configure the email functionality.
## Entity Relationship Diagram
[ERD](erd.png)
## Demo

You can view the live demo of the project here:  
[Live Demo](https://frontend-backend-playground-vtaz.vercel.app)

## Installation

To get started with this project, follow the steps below.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Node.js v18.17.0)

### Step-by-Step Installation for frontend

1. **Clone the repository**

   Run the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/ChiefMahedi/frontend-backend-playground.git
2. **Change directory**
   ```bash
   cd interactive-dashboard
2. **Change directory to frontend**
   ```bash
   cd frontend
4. **Install required packages**
   ```bash
   npm install
5. **Run the app**
   ```bash
   npm run dev

Access the app on: http://localhost:5173/ (Make sure no the other service is running on port 5173)

Note: Frontend dev server runs on port 5173 you can access the app by going to : http://localhost:5173/. Also to send emails using the app, you must create an account on Email.js and collect the Service Key, Public Key, and Email Template Key. These keys should be added to the .env file to configure the email functionality. .env keys will be:  VITE_EMAILJS_SERVICE_KEY, VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_TEMPLATE_KEY

### Step-by-Step Installation for backend
2. **Change directory to backend**
   ```bash
   cd ..
   cd backend
4. **Install required packages**
   ```bash
   npm install
5. **Run the app**
   ```bash
   npm start

Note: Backend server runs on port 3000. (Make sure no the other service is running on port 3000)

1. Make a GET request to get all the customers: http://localhost:3000/customers
2. Make a GET request to get all the products: http://localhost:3000/products
3. Make a GET request to get all the orders: http://localhost:3000/orders


Open two terminals and run both frontend and backend servers. Create one entry in frontend .env called VITE_ENV = LOCAL. The frontend will then dynamically fetch data from backend to get all customers data.