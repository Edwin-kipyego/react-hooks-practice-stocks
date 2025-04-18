import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  const handleBuyStock = (stock) => {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const handleSellStock = (stock) => {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortType === "Alphabetically") {
      return a.ticker.localeCompare(b.ticker);
    } else if (sortType === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = sortedStocks.filter((stock) =>
    filterType === "All" ? true : stock.type === filterType
  );

  return (
    <div>
      <SearchBar onSort={handleSort} onFilter={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onSellStock={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;

