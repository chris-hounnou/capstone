import axios from "axios";

// jest.mock('axios', () => ({
//   get: jest.fn(() => Promise.resolve({ data: {} })),
// }));
const apiBaseUrl = "https://www.anapioficeandfire.com/api";

class OfIceAndFireApi {
  static async fetchWithPagination(endpoint, page = 1, pageSize = 10) {
    try {
      const requestUrl = `${apiBaseUrl}/${endpoint}?page=${page}&pageSize=${pageSize}`;
      const response = await axios.get(requestUrl);

      if (response.status === 200) {
        const linkHeader = response.headers.link;
        const paginationInfo = OfIceAndFireApi.parseLinkHeader(linkHeader);
        return {
          data: response.data,
          paginationInfo,
        };
      } else {
        throw new Error(`API Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error.message);
      throw error;
    }
  }

  static async fetchNextPage(endpoint, paginationInfo) {
    if (paginationInfo.next) {
      const response = await axios.get(paginationInfo.next);
      return {
        data: response.data,
        paginationInfo: OfIceAndFireApi.parseLinkHeader(response.headers.link),
      };
    }
    return null;
  }

  static async fetchPreviousPage(endpoint, paginationInfo) {
    if (paginationInfo.prev) {
      const response = await axios.get(paginationInfo.prev);
      return {
        data: response.data,
        paginationInfo: OfIceAndFireApi.parseLinkHeader(response.headers.link),
      };
    }
    return null;
  }

  static parseLinkHeader(header) {
    const links = header.split(',');
    const paginationInfo = {};
    links.forEach((link) => {
      const parts = link.split(';');
      if (parts.length === 2) {
        const url = parts[0].trim().slice(1, -1); 
        const rel = parts[1].trim();
        paginationInfo[rel] = url;
      }
    });
    return paginationInfo;
  }
}

export default OfIceAndFireApi;
