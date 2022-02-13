import './css/styles.css';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import NewsApiService from '../src/js/api'

const DEBOUNCE_DELAY = 300;
const refs = {
    inputArea: document.querySelector('input#search-box'),
    countryInfoCard: document.querySelector('.country-info'),
    countriesList: document.querySelector('.country-list'),
};
const newsApiService = new NewsApiService();

refs.inputArea.setAttribute('placeholder', 'Please, enter name of country');
refs.inputArea.addEventListener('input', debounce(onInputEvent, DEBOUNCE_DELAY));

function onInputEvent(event) {
    newsApiService.search = event.target.value.trim();

    newsApiService.fetchCountries()
        .then((countries) => {
            if (countries.length === 1) {
                cleanerCountriesList();
                return renderCountryCard(countries);
            } else if (countries.length > 10) {
                cleanerCountriesList();
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else if (countries.length <= 10 || countries.length > 1) {
                cleanerCountryCard();
                cleanerCountriesList();
                return renderCountriesList(countries);
            } else {
                cleanerCountryCard();
                cleanerCountriesList();
                return Notiflix.Notify.failure("Oops, there is no country with that name");
            }
        })
        .catch((error) => console.log(error));
}

function renderCountriesList(countries) {
    refs.countriesList.insertAdjacentHTML('beforeend', countryListTpl(countries))
}

function renderCountryCard(countries) {
    const markup = countryCardTpl(...countries);
    refs.countryInfoCard.innerHTML = markup;
}

function cleanerCountriesList() {
    refs.countriesList.innerHTML = '';
}

function cleanerCountryCard() {
    refs.countryInfoCard.innerHTML = '';
}