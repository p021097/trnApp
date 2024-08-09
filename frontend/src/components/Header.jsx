import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { data, months } from "../assets/data.js";
import axios from 'axios'
import { StoreContext } from "../context/StoreContext.jsx";

const Header = () => {
  const {url} = useContext(StoreContext)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Mar');
  const [search, setSearch] = useState('')
  const [trn, setTrn] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const onChangeHandler = (event) => {
    const value
    setSelectedMonth(event.target.value)
    setCurrentPage(1)
  };

  const handleSearch = (event) => {
    set
  }

  const fetchTransactions = async() => {
    try {
      const res = await axios.get(`${url}/api/transactions`, {
        params:{
          month : selectedMonth,
          search: search
        }
      })
      setTrn(res.data)
      setCurrentPage(1)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchTransactions()
  },[selectedMonth, search])



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleNextPage = () => {
    if(currentPage < totalPages) {
        setCurrentPage(currentPage+1)
    }
  }

  const handlePreviousPage = () => {
    if(currentPage > 1){
        setCurrentPage(currentPage - 1)
    }
  }

  const handleMonthFilter = data.filter((item) => {
    const saleMonth = new Date(item.dateOfSale).toLocaleString('default',{month : 'short'})
    return saleMonth == selectedMonth
  })

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = handleMonthFilter.slice(startIndex, startIndex + itemsPerPage)

 
  
  return (
    <div>
      <div className="header-tabs">
        <input type="search" />
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-button">
            Select month
          </button>
          {isOpen && (
            <div className="dropdown-menu">
              <select onChange={onChangeHandler} name="month" value={selectedMonth}>
                {months.map((month, idx) => (
                  <option className="dropdown-item" key={idx} value={month} >
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
          <tHead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </tHead>
          <tBody>
            {currentItems.map((trn, idx) => (
              <tr key={idx}>
                <td>{trn.id}</td>
                <td>{trn.title}</td>
                <td>{trn.description}</td>
                <td> $ {trn.price}</td>
                <td>{trn.category}</td>
                <td>{trn.sold ? "Yes" : "No"}</td>
                <td><img src={trn.image} alt={trn.title} className="item-image"/></td>
              </tr>
            ))}
          </tBody>
        </table>
      </div>
      <div className="pagination">

        <button onClick={handleNextPage} disabled={currentPage == totalPages}>Next</button>
        {
            Array.from({length : totalPages}, (_,idx) => (
                <button key={idx + 1} onClick={() => handlePageChange(idx + 1)} className={currentPage === idx + 1 ? 'active' : ''}>{idx + 1}</button>
            ))
        }
        <button onClick={handlePreviousPage} disabled={currentPage == 1}>Previous</button>


      </div>
    </div>
  );
};

export default Header;
