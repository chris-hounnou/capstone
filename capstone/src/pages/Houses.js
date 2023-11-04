import React, { useState, useEffect } from 'react';
import { createRoutesFromElements } from 'react-router-dom';
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
  }

  const handleNextPage = () => {
     {
      setPage(page + 1);
    }
  }

  const handlePreviousPage = () => {
    {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    fetchHousesWithPagination(page, pageSize);
  }, [page, pageSize]);

  const renderPaginationControls = () => {
    return (
      <div>
        {/* <button onClick={handlePreviousPage} disabled={!paginationInfo.prev}> */}
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
  }

  const renderHouseList = () => {
    if (isLoading) {
      return <h1>Loading...</h1>;
    } else if (houses.length > 0) {
      return (
        <ul>
          {houses.map((house) => (
            <li key={house.url}>
              {house.name}
              {house.region}
              {house.words}
              {house.currentLord}
              {house.swornMembers}
            </li>
          ))}
        </ul>
      );
    } else {
      return <h1>No houses found.</h1>;
    }
  }

  return (
    <div>
      <h2>Houses</h2>
      {renderPaginationControls()}
      {renderHouseList()}
    </div>
  );
}

export default Houses;
