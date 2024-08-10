import React, { useContext, useState } from "react";
import "./PieChartBar.css";
import { StoreContext } from "../context/StoreContext";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';


const PieChartBar = () => {
  const { pieChartData, selectedMonth } = useContext(StoreContext);

  const updatedData = pieChartData.map((item)=>({
    name:item._id,
    value:item.count
  }))
  
  const showName = ({name, value})=>{
    return `${name} : ${value}`
}

const COLORS = ["#0088FE", '#00c49f', '#FFBB28', '#FF8042', '#A569BD']

  return (
    <div className="piechartbar">
      <div className="piechartbar-container">
        <div className="piechartbar-heading">
          <h1>Pie Chart Stats - {selectedMonth}</h1>
          <span>(Selected month name from dropdown)</span>
        </div>
        <div className="piechartbar-data">
        <PieChart width={600} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={updatedData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill='#8884d8'
            label={showName}
          >
            {updatedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
          ))}
          </Pie>
          
          <Tooltip />
        </PieChart>
        </div>
      </div>
    </div>
  );
};

export default PieChartBar;
