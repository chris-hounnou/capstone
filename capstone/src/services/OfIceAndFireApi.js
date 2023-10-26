import axios from 'axios';

const apiBaseUrl = "https://www.anapioficeandfire.com/api";

class OfIceAndFireApi {
  static async fetchCharacters(page = 1, pageSize = 10, filters = {}) {
    try {
      const { name, gender, culture, born, died, isAlive } = filters;

      const params = {
        page,
        pageSize,
        name,
        gender,
        culture,
        born,
        died,
        isAlive,
      };

      const response = await axios.get(`${apiBaseUrl}/characters`, {
        params,
      });
      if (response.status === 200){

       
       return response.data; // Return the response data
      }else{
        throw new Error(`API Request failed with status:${response.status}`);
      }
      } catch (error) {
      console.error("Error fetching characters:", error.message);
      throw error; // Re-throw the error so it can be caught in the Characters component
    }
  }




  // Add similar functions for fetching books, houses, and specific resources
static async fetchCharacter(page = 1, pageSize = 10)  {
  try {
    const response = axios.get(`${apiBaseUrl}/characters`, {
      params: { page, pageSize },
    });

    return {
      data: response.data,
      // paginationLinks: (response.headers.get('Link')),
    };
  } catch (error) {
    console.error("DEBUG ", error.message)
  }
}


}





export default OfIceAndFireApi;

