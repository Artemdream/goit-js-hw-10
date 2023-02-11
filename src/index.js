import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from './API/fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const input = document.getElementById('search-box');
const ul = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');


input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    e.preventDefault()

    const inputSearchCountry = e.target.value.trim();
    
    if (!inputSearchCountry) {
        resetMarkup(ul);
        resetMarkup(infoCountry);
    } 
        fetchCountries(inputSearchCountry)
            .then(dataCountry => {
                if (dataCountry.length > 10) {
                    Notiflix.Notify.info(
                        "Too many matches found. Please enter a more specific name.");
                } else if (dataCountry.length >= 2 && dataCountry.length <= 10) {
                    renderCountryList(dataCountry);
                    resetMarkup(infoCountry);
                } else {
                    resetMarkup(ul);
                    renderCountry(dataCountry);
                }
        })
            .catch(() => {
                resetMarkup(ul)
                resetMarkup(infoCountry)
                 Notiflix.Notify.failure(
                        "Oops, there is no country with that name");
            })
};
    
function renderCountryList(counrties) {
    const markup = counrties.map(({ name, flags}) => {
        return `<li class="country-list-item">
                <img class="img-flag" src="${flags.svg}" alt="flags" width="30">
                <p class="name-country-list">${name.official}</p>
                </li>`;
    }).join('');
      ul.innerHTML = markup;
};

function renderCountry(counrties) {
    const markup = counrties.map(({ name, flags, capital, population, languages }) => {
        return `<li class="country-item">
                <img loading="lazy" class="img-flag" src="${flags.svg}" alt="flags" width="40">
                <p class="country-name">${name.official}</p>
                </li>
                <li class="country-item-info">
                <p>Capital: <span class="info">${capital}</span></p>
                <p>Population: <span class="info">${population}</span></p>
                <p>Languages: <span class="info">${Object.values(languages).join(', ')}</span></p>
                </li>`; 
    }).join('');
       infoCountry.innerHTML = markup;
};
              
function resetMarkup(e) {
    e.innerHTML = "";
};    
  

