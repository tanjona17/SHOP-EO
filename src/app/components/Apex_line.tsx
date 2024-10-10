import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useSWR from "swr";
import { TOKEN } from "@/redux/api";

const fetcher = (...args: [any]) =>
  fetch(...args, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `Bearer ${TOKEN}`,
    },
  }).then((res) => res.json());

export default function ApexLine() {
  // Fetch count data with useSWR
  const { data: count, error: count_error } = useSWR(
    `http://localhost:1234/api/product/income`,
    fetcher,
    { revalidateOnFocus: true }
  );

  // Initialize the chart state
  const [state, setState] = useState({
    series: [
      {
        name: "Number of sales",
        data: [], // Empty array initially, will be updated dynamically
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
        text: "Analysis of the market",
        align: "left",
      },

      labels: [
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

  // Update the chart when count data is available
  useEffect(() => {
    if (count && count.length > 0) {
      // Map the `q` values (number of sales) from the count data
      const salesData = count.map((item) => item.q);

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Number of sales",
            data: salesData, // Update the data dynamically with the mapped values
          },
        ],
      }));
    }
  }, [count, count_error]); // Watch for changes in count or error

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
