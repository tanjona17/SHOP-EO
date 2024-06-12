import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function Apex_line() {
  const [state, set_state] = useState({
    series: [
      {
        name: "Number of sales",
        data: [2, 3, 25, 8, 1, 50],
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

      labels: ["January", "February", "March"],
      xaxis: {
        type: "month",
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
          width={750}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(React.createElement(ApexChart), domContainer);
