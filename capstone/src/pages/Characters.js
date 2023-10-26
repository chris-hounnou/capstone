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
    // Add more filters as needed
  };
  const maxRetries = 3; // Define the maximum number of retries
  const [retryCount, setRetryCount] = useState(0); // Track the number of retries

  // Function to fetch characters with retry
  const fetchCharactersWithRetry = async () => {
    try {
      setIsLoading(true);
      // Assuming that OfIceAndFireApi.fetchCharacters is used correctly.
      const response = await OfIceAndFireApi.fetchCharacters(page, pageSize, filters);

      if (response.data) {
        setCharacters(response.data);
        // Uncomment and use the following line to set total pages based on API response
        setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
      } else {
        console.error("Empty response from the API.");
        console.log(response);
      }
      setIsLoading(false);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error("Error fetching characters:", error);

      if (retryCount < maxRetries) {
        console.log(`Retrying (${retryCount + 1} of ${maxRetries})...`);
        // Retry with an increased retryCount after a short delay (rate limiting).
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          fetchCharactersWithRetry();
        }, 1000); // Adjust the delay as needed
      } else {
        console.error("Max retries reached. Unable to fetch characters.");
        setIsLoading(false);
      }
    }
  };

  // Handle changing the page
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle changing the page size
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  // Apply filters and pagination when page or pageSize change
  useEffect(() => {
    if (retryCount === 0) {
      fetchCharactersWithRetry(); // Start with retryCount set to 0
    }
  }, [page, pageSize, filters, retryCount]);

  return (
    <div>
      <h2>Characters</h2>
      {/* Pagination controls */}
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
      {/* Page size controls */}
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
