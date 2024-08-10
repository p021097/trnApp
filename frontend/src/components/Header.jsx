import { useContext, useEffect, useState } from "react";
import "./Header.css";
import {months} from "../assets/data.js";
import { StoreContext } from "../context/StoreContext.jsx";
import Statistics from "./Statistics.jsx";
import BarChart from "./BarChart.jsx";

const Header = () => {

  // Store Context
  const {
    combinedData,
    transactions,
    barChartData,
    pieChartData,
    statistics,
    selectedMonth,
    setSelectedMonth,
    search,
    setSearch,
  } = useContext(StoreContext);

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  // useEffect(() => {
  //   console.log(barChartData);
  //   console.log(pieChartData);
  //   console.log(combinedData);
  //   console.log(statistics);
  //   console.log(transactions.trns.length);
    
  // }, [combinedData, selectedMonth]);


// Handlers
  const onChangeHandler = (event) => {
    const { value } = event.target;
    setSelectedMonth(value);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMonthFilter = transactions.trns.filter((item) => {
    const saleMonth = new Date(item.dateOfSale).toLocaleString("default", {
      month: "short",
    });
    return (
      saleMonth == selectedMonth &&
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.price.toString().includes(search))
    );
  });

  const totalPages = Math.ceil(transactions.trns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = handleMonthFilter.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <div className="header-tabs">
        <input
          type="search"
          placeholder="Search Trasactions ...."
          value={search}
          onChange={handleSearch}
        />
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-button">
            Selected Month = {selectedMonth}
          </button>
          {isOpen && (
            <div className="dropdown-menu">
              <select
                onChange={onChangeHandler}
                name="month"
                value={selectedMonth}
              >
                {months.map((month, idx) => (
                  <option className="dropdown-item" key={idx} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((trn, idx) => (
              <tr key={idx}>
                <td>{trn.id}</td>
                <td>{trn.title}</td>
                <td>{trn.description}</td>
                <td> $ {trn.price}</td>
                <td>{trn.category}</td>
                <td>{trn.sold ? "Yes" : "No"}</td>
                <td>
                  <img src={trn.image} alt={trn.title} className="item-image" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handleNextPage} disabled={currentPage == totalPages}>
          Next
        </button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => handlePageChange(idx + 1)}
            className={currentPage === idx + 1 ? "active" : ""}
          >
            {idx + 1}
          </button>
        ))}
        <button onClick={handlePreviousPage} disabled={currentPage == 1}>
          Previous
        </button>
      </div>
      <Statistics/>
      <BarChart/>
    </div>
  );
};

export default Header;
