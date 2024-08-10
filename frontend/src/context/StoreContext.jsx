import { createContext, useState, useEffect } from "react";
import { monthMapping, months } from "../assets/data";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";

  const [transactions, setTransactions] = useState({ trns: [] });
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const [search, setSearch] = useState("");


  // fetching the data
  const fetchAllData = async (month, search) => {
    try {
      const trnsData = await axios.get(`${url}/api/trn/list`, {
        params: { month, search },
      });
      setTransactions(trnsData.data);
      const AllData = await axios.get(`${url}/api/trn/combineddata`, {
        params: { month },
      });
      setCombinedData(AllData.data);
      setBarChartData(AllData.data.barchart)
      setPieChartData(AllData.data.piechart)
      setStatistics(AllData.data.statistics)
    } catch (error) {
      console.log(error);
    }
  };

  // use Effects
  useEffect(() => {
    fetchAllData(monthMapping[selectedMonth], search);
  }, [selectedMonth, search]);

  



  const contextValue = {
    url,
    setTransactions,
    transactions,
    setCombinedData,
    combinedData,
    setBarChartData,
    barChartData,
    setPieChartData,
    pieChartData,
    setStatistics,
    statistics,
    selectedMonth,
    setSelectedMonth,
    search,
    setSearch,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
