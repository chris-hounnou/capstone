import react, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import OfIceAndFireApi from '../services/OfIceAndFireApi';



function Characters () {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function fetchCharacters() {
            try {
              const charactersData = await OfIceAndFireApi.fetchCharacters();
              setCharacters(charactersData);
        
            } catch (error) {
              console.error("Error fetching characters:", error);
            }
          }
      
          fetchCharacters();
        },[])
    return (
        <div>
        <h2>Characters</h2>
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <Link to={`/characters/${character.id}`}>{character.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default Characters