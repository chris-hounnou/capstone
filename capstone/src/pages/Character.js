import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OfIceAndFireApi from "../services/OfIceAndFireApi";

function Character() {
  const [character, setCharacter] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const characterData = await OfIceAndFireApi.fetchCharacterById(id);
        setCharacter(characterData);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    }

    fetchCharacter();
  }, [id]);

  return (
    <div>
      <h2>{character.name}</h2>
      <p>Culture: {character.culture}</p>
      <p>Gender: {character.gender}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default Character;