import React, { useContext } from "react";
import "./Statistics.css";
import { StoreContext } from "../context/StoreContext";

const Statistics = () => {
  const { statistics, selectedMonth } = useContext(StoreContext);

  return (
    <div className="statistics">
      <div className="statistics-container">
        <div className="statistics-container-heading">
        <h2>Statistics - {selectedMonth} </h2>
        <span>(Selected month from the dropdown)</span>
        </div>
        
        <div className="statistics-data">
          <div className="statistics-data-item">
            <p>Total Sales</p>
            <span>{statistics.totalSales}</span>
          </div>
          <div className="statistics-data-item">
            <p>Total sold items</p>
            <span>{statistics.soldItems}</span>
          </div>
          <div className="statistics-data-item">
            <p>Total not sold items</p>
            <span>{statistics.notSoldItems}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
