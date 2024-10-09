import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import useSWR from "swr";
import { TOKEN } from "@/redux/api";

const fetcher = (...args: [any]) =>
  fetch(...args, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `Bearer ${TOKEN}`
    },
  }).then((res) => res.json());

export default function Apex_line() {

  const {data: products, error:products_error} = useSWR(`http://localhost:1234/api/product`,fetcher,{
    revalidateOnFocus:true
  });

  const {data: count, error: count_error} = useSWR(`http://localhost:1234/api/user?count=true`,fetcher,{
    revalidateOnFocus:true
  });

  console.log(count);
  
  
  const [state, set_state] = useState({
    series: [
      {
        name: "Number of sales",
      data: [],
        
      },
    ],
    options: {
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      title: {
        text: " Analysis of the market",
        align: "left",
      },

      labels: [
        "January", "February", "March",
        "April", "Mai", "June",
        "July", "August", "September",
        "October", "November", "December"

      ],
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "Mai",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      yaxis: {
        opposite: false,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  });

  return (
    <div>
      <div
        id="chart"
        className="flex items-center justify-center h-full mt-[40px] pt-5 mb-4 rounded bg-gray-50 shadow-lg rounded-[9px]"
      >
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
          width={950}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(React.createElement(ApexChart), domContainer);

// labels: [
//   "January", "February", "March",
//   "April", "Mai", "June",
//   "July", "August", "September",
//   "October", "November", "December"

// ],
// xaxis: {
//   type: "month",
// },



it is my chart how can i make it dynamically by using the count as data