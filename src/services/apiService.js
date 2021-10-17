const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '22968380-c77365a0aacae74fb17ed9f87';

export default function fetchImages(searchQuery, pageNumber, perPage) {
  const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    q: searchQuery,
    page: pageNumber,
    per_page: perPage,
    key: API_KEY,
  });
  const url = `${BASE_URL}${searchParams}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Somthing goes wrong'));
  });
}
