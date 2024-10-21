import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const ProductChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: [], // product names will go here
      },
      title: {
        text: 'Product Quantities'
      },
      dataLabels: {
        enabled: true,
      }
    }
  });

  useEffect(() => {
    // Fetch the data from your backend
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/revenue'); // Adjust your API endpoint
        const data = response.data;

        // Assuming response is an array of objects like:
        // [{ total_price: 600, quantity: 3, product_name: "prod_1" }, ...]

        // Extract product names and quantities
        const productNames = data.map((item: { product_name: any; }) => item.product_name);
        const quantities = data.map((item: { quantity: any; }) => item.quantity);

        // Set the chart data
        setChartData(prevState => ({
          ...prevState,
          series: [{ name: 'Quantity', data: quantities }],
          options: {
            ...prevState.options,
            xaxis: { categories: productNames }
          }
        }));
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ProductChart;
