import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfIceAndFireApi from '../services/OfIceAndFireApi';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState({});

  const fetchCharactersWithPagination = async (page, pageSize) => {
    try {
      setIsLoading(true);
      const { data, paginationInfo } = await OfIceAndFireApi.fetchWithPagination('characters', page, pageSize);

      setCharacters(data);
      setPaginationInfo(paginationInfo);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }

  const handleNextPage = () => {
    if (paginationInfo.next) {
      setPage(page + 1);
    }
  }

  const handlePreviousPage = () => {
    if (paginationInfo.prev) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    fetchCharactersWithPagination(page, pageSize);
  }, [page, pageSize]);

  const renderPaginationControls = () => {
    return (
      <div>
        <button onClick={handlePreviousPage} disabled={!paginationInfo.prev}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={!paginationInfo.next}>
          Next
        </button>
      </div>
    );
  }

  const renderCharacterList = () => {
    if (isLoading) {
      return <h1>Loading...</h1>;
    } 
    else if (characters.length > 0) {
      return (
        <ul>
          {characters.map((character) => (
            <li key={character.url}>
              <Link to={`/characters/${character.url.split('/').pop()}`}>
                Name: {character.name} | Gender: {character.gender} | Culture: {character.culture}
              </Link>
            </li>
          ))}
        </ul>
      );
    } else {
      return <h1>No characters found.</h1>;
    }
  }

  return (
    <div>
      <h2>Characters</h2>
      {renderPaginationControls()}
      {renderCharacterList()}
    </div>
  );
}

export default Characters;
