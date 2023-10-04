import { fetchBreeds, fetchCatByBreed } from './cat-api';

// import axios from 'axios';
import SlimSelect from 'slim-select';

// axios.defaults.headers.common['x-api-key'] = API_KEY;

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

let arrBreeds = [];

refs.loader.classList.add('is-hidden');
refs.error.classList.add('is-hidden');
refs.breedSelect.classList.add('is-hidden');

fetchBreeds().then(data => {
  refs.breedSelect.classList.remove('is-hidden');
  data.forEach(el => {
    arrBreeds.push({ text: el.name, value: el.id });
  });
  new SlimSelect({
    select: refs.breedSelect,
    data: arrBreeds,
  });
});

refs.breedSelect.addEventListener('change', onSelect);

function onSelect(e) {
  const breedId = e.currentTarget.value;

  refs.loader.classList.remove('is-hidden');
  refs.breedSelect.classList.add('is-hidden');

  console.log(breedId);
  fetchCatByBreed(breedId).then(resp => {
    refs.loader.classList.add('is-hidden');
    refs.breedSelect.classList.remove('is-hidden');

    const { url, breeds } = resp[0];

    refs.catInfo.innerHTML = `
      <img src="${url}" width = "500" alt="${breeds[0].name}">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p><span>Temperament:</span> ${breeds[0].temperament}</p>`;
  });
  // refs.loader.classList.add('is-hidden');
}
