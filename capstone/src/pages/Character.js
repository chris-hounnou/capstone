import React, { useState, useEffect } from 'react';
import OfIceAndFireApi from '../services/OfIceAndFireApi';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
          const characterData = response.data;

          const allegianceNames = await Promise.all(
            characterData.allegiances.map(async (allegianceUrl) => {
              const allegianceResponse = await axios.get(allegianceUrl);
              return allegianceResponse.data.name;
            })
          );

          characterData.allegiances = allegianceNames;

          const fetchAndReplaceName = async (urlKey) => {
            if (characterData[urlKey]) {
              const url = characterData[urlKey];
              const urlResponse = await axios.get(url);
              characterData[urlKey] = urlResponse.data.name;
            }
          };

          // Fetch and replace father, mother, and spouse URLs with their names
          await Promise.all([
            fetchAndReplaceName('father'),
            fetchAndReplaceName('mother'),
            fetchAndReplaceName('spouse')
          ]);

          setCharacter(characterData);
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
          <p>Father: {character.father || 'N/A'}</p>
          <p>Mother: {character.mother || 'N/A'}</p>
          <p>Spouse: {character.spouse || 'N/A'}</p>
          <p>Allegiances: {character.allegiances.join(', ')}</p>
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
