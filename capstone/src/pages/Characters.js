import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfIceAndFireApi from '../services/OfIceAndFireApi';
import styles from './Characters.module.css'
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

      console.log(paginationInfo)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
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

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1); 
  };


  useEffect(() => {
    fetchCharactersWithPagination(page, pageSize);
  }, [page, pageSize]);

  const renderPaginationControls = () => {
    if (!paginationInfo) {
      return <div>Loading...</div>;;
    }
    return (
      <div>
        {/* <button onClick={handlePreviousPage} disabled={!paginationInfo.prev}> */}
        <button onClick={handlePreviousPage} className={styles.previous}>

          Previous
        </button>
        <span>Page {page}</span>
        {/* <button onClick={handleNextPage} disabled={!paginationInfo.next}> */}
        <button onClick={handleNextPage}  className={styles.next}>

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
            <li className={styles.characterContainer} key={character.url}>
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
      <div>
        <label>
          Page Size:
          <select value={pageSize} onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
      {renderPaginationControls()}
      {renderCharacterList()}
    </div>
  );
}

export default Characters;
