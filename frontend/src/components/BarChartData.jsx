import React, { useContext } from "react";
import "./BarChart.css";
import { StoreContext } from "../context/StoreContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'

const BarChartData = () => {
  const { barChartData, selectedMonth } = useContext(StoreContext);
  return (
    <div className="barchartdata">
      <div className="barchart-container">
      <div className="barchart-heading">
        <h1>Bar Charts Stats - {selectedMonth}</h1>
        <span>(Selected month name from dropdown)</span>
      </div>
      <div className="barchart">
      <BarChart width={800} height={330} data={barChartData}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="range" />
        <YAxis dataKey='count' />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />

      </BarChart>
      </div>
      </div>
    </div>
  );
};

export default BarChartData;
