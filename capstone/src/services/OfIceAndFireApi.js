import axios from "axios";


const apiBaseUrl = "https://www.anapioficeandfire.com/api";

class OfIceAndFireApi {
    static fetchCharacters(page = 1, pageSize = 10)  {
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

