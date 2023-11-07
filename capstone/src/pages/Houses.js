
import React, { useState, useEffect } from 'react';
import OfIceAndFireApi from '../services/OfIceAndFireApi';

function Houses() {
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState({});

  const fetchHousesWithPagination = async (page, pageSize) => {
    try {
      setIsLoading(true);
      const { data, paginationInfo } = await OfIceAndFireApi.fetchWithPagination('houses', page, pageSize);

      setHouses(data);
      setPaginationInfo(paginationInfo);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1); // Reset to the first page when changing page size
  };


  useEffect(() => {
    fetchHousesWithPagination(page, pageSize);
  }, [page, pageSize]);

  const renderPaginationControls = () => {
    return (
      <div>
        {/* <button onClick={handlePreviousPage} disabled={page === 1}> */}
        <button onClick={handlePreviousPage} >

          Previous
        </button>
        <span>Page {page}</span>
        {/* <button onClick={handleNextPage} disabled={!paginationInfo.next}> */}
        <button onClick={handleNextPage} >

          Next
        </button>
      </div>
    );
  };

  const renderHouseList = () => {
    if (isLoading) {
      return <h1>Loading...</h1>;
    } else if (houses.length > 0) {
      return (
        <ul>
          {houses.map((house) => (
            <li key={house.url}>
              <div>
                <h3>{house.name}</h3>
                <p>Region: {house.region}</p>
                <p>Words: {house.words}</p>
                <p>Current Lord: {house.currentLord || 'N/A'}</p>
                <p>
                  Sworn Members: {house.swornMembers.length > 0 ? house.swornMembers.join(', ') : 'N/A'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      );
    } else {
      return <h1>No houses found.</h1>;
    }
  };

  return (
    <div>
      <h2>Houses</h2>
      <label>
          Page Size:
          <select value={pageSize} onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      {renderPaginationControls()}
      {renderHouseList()}
    </div>
  );
}

export default Houses;

