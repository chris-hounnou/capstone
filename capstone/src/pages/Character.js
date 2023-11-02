import React, { useState, useEffect } from 'react';
import OfIceAndFireApi from '../services/OfIceAndFireApi';

function Character({ match }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const characterId = match.params.id;

    const fetchCharacter = async () => {
      try {
        setIsLoading(true);
        const response = await OfIceAndFireApi.fetchCharacterById(characterId);

        setCharacter(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };

    fetchCharacter();
  }, [match.params.id]);

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
