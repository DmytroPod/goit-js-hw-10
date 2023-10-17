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

const { breedSelect, catInfo, loader, error } = refs;

loader.classList.add('is-hidden');

error.classList.add('is-hidden');

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
  .catch(setError);

refs.breedSelect.addEventListener('change', onSelect);

function onSelect(e) {
  catInfo.classList.add('is-hidden');
  breedSelect.classList.add('is-hidden');
  loader.classList.remove('is-hidden');
  const breedId = e.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(resp => {
      loader.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');
      const { url, breeds } = resp[0];

      return (catInfo.innerHTML = `
      <img src="${url}" width = "500" alt="${breeds[0].name}">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p><b>Temperament:</b> ${breeds[0].temperament}</p>`);
    })
    .catch(setError);
}
function setError(error) {
  catInfo.classList.add('is-hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
