import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";
import useFakeNewsStore from "../../../zustand/fakenews.zustand";
import React, { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesChart = () => {
  const { getTotalAnalyticsStats, analytics } = useFakeNewsStore();
  const [chartType, setChartType] = useState("languages");
  useEffect(() => {
    getTotalAnalyticsStats();
  }, []);

  let chartData = [];
  let dataKey = "languageCounts";
  if (chartType === "countries") {
    dataKey = "countryCounts";
  } else if (chartType === "siteURLs") {
    dataKey = "urlSiteCounts";
  }
  if (analytics && analytics.dates && analytics[dataKey]) {
    analytics.dates.forEach((date, index) => {
      let dataPoint = { others: new Date(date).toLocaleDateString() };

      analytics[dataKey].forEach((data) => {
        Object.entries(data).forEach(([key, counts]) => {
          if (!dataPoint[key]) {
            dataPoint[key] = 0;
          }
          dataPoint[key] += counts[index];
        });
      });
      chartData.push(dataPoint);
    });
  }

  const seriesData = Object.entries(chartData[0] || {}).map(([key, _]) => ({
    name: key,
    data: chartData.map(item => item[key] || null)
  }));
  const chartOptions = {
    chart: {
      type: "area" // Changed from "area" to "line"
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      strokeDashArray: 3,
      borderColor: "rgba(0,0,255,0.1)"
    },
    stroke: {
      curve: "smooth",
      width: 1
    },
    xaxis: {
      categories: chartData.map(item => item.others)
    }
  };

  const handleChangeChartType = (event) => {
    setChartType(event.target.value);
  };

  return (
    <Card className="bg-[#D5F3F2] rounded-lg shadow-md">
      <CardBody>
        <div className="mb-3 flex justify-end items-end">
          <select className="bg-[#D5F3F2]" value={chartType} onChange={handleChangeChartType}>
            <option value="languages">Languages</option>
            <option value="countries">Countries</option>
            <option value="siteURLs">Site URLs</option>
          </select>
        </div>
        <CardTitle tag="h5">Data Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Monthly Stats Report
        </CardSubtitle>
        <ReactApexChart
          type="area" // Changed from "area" to "line"
          width="100%"
          height={350}
          options={chartOptions}
          series={seriesData}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart;