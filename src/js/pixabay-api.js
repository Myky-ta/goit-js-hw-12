import axios from 'axios';

const API_KEY = '52827134-53a8d98a66d236597fa2c26fa';
export const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page,
    },
  });
  return response.data;
}
