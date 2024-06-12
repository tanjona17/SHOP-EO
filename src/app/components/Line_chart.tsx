
import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Line_chart(){
  const sampleData = [43, 40, 50, 40, 70, 40, 45, 33, 40, 60, 40, 50, 36];
  const canvasData = {
    datasets: [
      {
        label: "Home",
        borderColor: "navy",
        pointRadius: 0,
        fill: true,
        backgroundColor: 'white',
        lineTension: 0.5,
        data: sampleData,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        labels:  ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        ticks: {
          color: "black",
          font: {
            family: "Nunito",
            size: 20,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        min: 10,
        max: 200,
        ticks: {
          stepSize: 10,
          color: "black",
          font: {
            family: "Nunito",
            size: 20,
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  // const graphStyle = {
  //   minHeight: "10rem",
  //   maxWidth: "700px",
  //   width: "100%",
  //   border: "1px solid #C4C4C4",
  //   borderRadius: "0.375rem",
  //   padding: "0.5rem",
  // };
  return (
    <div className='flex items-center justify-center h-48 mb-4 rounded bg-gray-50 mt-[150px] dark:bg-gray-800'>
       <Line id="home" options={options} data={canvasData} height={350} width={750} />
    </div>
  );
};



