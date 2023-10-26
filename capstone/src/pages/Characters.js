import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfIceAndFireApi from '../services/OfIceAndFireApi';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const filters = {
    name: "",
    gender: "",
    culture: "",
  };
  const maxRetries = 3; 
  const [retryCount, setRetryCount] = useState(0); 

  const fetchCharactersWithRetry = async () => {
    try {
      setIsLoading(true);
      const response = await OfIceAndFireApi.fetchCharacters(page, pageSize, filters);

      if (response.data) {
        setCharacters(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
      } else {
        console.error("Empty response from the API.");
        console.log(response);
      }
      setIsLoading(false);
      setRetryCount(0); 
    } catch (error) {
      console.error("Error fetching characters:", error);

      if (retryCount < maxRetries) {
        console.log(`Retrying (${retryCount + 1} of ${maxRetries})...`);
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          fetchCharactersWithRetry();
        }, 1000); 
      } else {
        console.error("Max retries reached. Unable to fetch characters.");
        setIsLoading(false);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  useEffect(() => {
    if (retryCount === 0) {
      fetchCharactersWithRetry(); 
    }
  }, [page, pageSize, filters, retryCount]);

  return (
    <div>
      <h2>Characters</h2>
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
      <div>
        Page Size:
        <select onChange={(e) => handlePageSizeChange(Number(e.target.value))} value={pageSize}>
          <option value={10}>10</option>
        </select>
      </div>
      <ul>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : characters.length > 0 ? (
          characters.map((character) => (
            <li key={character.url}>
              <Link to={`/characters/${character.url.split('/').pop()}`}>
                Name: {character.name} | Gender: {character.gender} | Culture: {character.culture}
              </Link>
            </li>
          ))
        ) : (
          <h1>No characters found.</h1>
        )}
      </ul>
    </div>
  );
}

export default Characters;
