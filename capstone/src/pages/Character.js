// import React, { useState, useEffect } from 'react';
// import OfIceAndFireApi from '../services/OfIceAndFireApi';
// import {useParams} from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Characters from './Characters';

// function Character() {
//   const [character, setCharacter] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const {id} = useParams();
//   const [paginationInfo, setPaginationInfo] = useState({});
//   const [pageSize, setPageSize] = useState(10);
//   const [page, setPage] = useState(1);



//   useEffect(() => {
//     // const characterId = match.params.id;

//     const fetchCharacter = async () => {
//       try {
//         setIsLoading(true);
//         const { data, paginationInfo } = await OfIceAndFireApi.fetchWithPagination('characters', page, pageSize);

//         setCharacter(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching character:", error);
//       }
//     };

//     fetchCharacter();
//   }, [id]);

//   const renderCharacterDetails = () => {
//     if (isLoading) {
//       return <p>Loading character details...</p>;
//     }

//     if (character) {
//       return (
//         <div>
//           <h2>{character.name}</h2>
//           <p>Gender: {character.gender}</p>
//           <p>Culture: {character.culture}</p>
//           <p>Born: {character.born}</p>
//           <p>Died: {character.died}</p>
//           <p>Titles: {character.titles}</p>
//           {/* Add more character details here */}
//         </div>
//       );
//     } else {
//       return <p>Character not found.</p>;
//     }
//   };

//   return (
//     <div>
//       <h2>Character Details</h2>
//       {renderCharacterDetails()}
//       {paginationInfo()}
//     </div>
//   );
// }

// export default Character;
import React, { useState, useEffect } from 'react';
import OfIceAndFireApi from '../services/OfIceAndFireApi';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Character() {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://www.anapioficeandfire.com/api/characters/${id}`);

        if (response.status === 200) {
          setCharacter(response.data);
          setIsLoading(false);
        } else {
          console.error("Error fetching character:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  const renderCharacterDetails = () => {
    if (isLoading) {
      return <p>Loading character details...</p>;
    }

    if (character) {
      return (
        <div>
          <h2>{character.name}</h2>
          <p>Gender: {character.gender}</p>
          <p>Culture: {character.culture}</p>
          <p>Born: {character.born}</p>
          <p>Died: {character.died}</p>
          <p>Titles: {character.titles.join(', ')}</p>
          <p>Father: {character.father}</p>
          <p>Mother:{character.mother}</p>
          <p>Spouse:{character.spouse}</p>
          <p>Allegiances:{character.allegiances}</p>
          {/* Add more character details here */}
        </div>
      );
    } else {
      return <p>Character not found.</p>;
    }
  };

  return (
    <div>
      <h2>Character Details</h2>
      {renderCharacterDetails()}
    </div>
  );
}

export default Character;
