// axios.defaults.headers.common['x-api-key'] =

import axios from 'axios';

//   'live_cuYkztc7uGQDg7XLJa5nubYOVWUtt1GCidEq7t2HsoTmVpQEJ6EK8FNThhviBt55';
const API_KEY =
  'live_cuYkztc7uGQDg7XLJa5nubYOVWUtt1GCidEq7t2HsoTmVpQEJ6EK8FNThhviBt55';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = 'breeds';
const IMAGE_ENDPOINT = 'images/search';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catImage: document.querySelector('.cat-inform'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

export function fetchBreeds() {
  return axios.get(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}`).then(resp => {
    return resp.data;
  });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}${IMAGE_ENDPOINT}?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(resp => {
      return resp.data;
    });
}
