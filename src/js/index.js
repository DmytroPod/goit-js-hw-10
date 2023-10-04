import { fetchBreeds, fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
// axios.defaults.headers.common['x-api-key'] = API_KEY;

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

let arrBreeds = [];

refs.breedSelect.addEventListener('change', onSelect);

refs.loader.classList.add('is-hidden');
refs.error.classList.add('is-hidden');
refs.catInfo.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    data.forEach(el => {
      arrBreeds.push({ text: el.name, value: el.id });
    });
    new SlimSelect({
      select: refs.breedSelect,
      data: arrBreeds,
    });
  })
  .catch(err => {
    console.log(err);
  });

function onSelect(e) {
  const breedId = e.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(resp => {
      const { url, breeds } = resp[0];

      return (refs.catInfo.innerHTML = `
      <img src="${url}" width = "500" alt="${breeds[0].name}">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p><span>Temperament:</span> ${breeds[0].temperament}</p>`);
    })
    .catch(err => console.log(err));
  refs.catInfo.classList.remove('is-hidden');
}
