export default class NewsApiService {
    constructor() {
        this.toSearch = '';
    }

    fetchCountries() {
        return fetch(`https://restcountries.com/v3.1/name/${this.toSearch}?fields=name,capital,population,flags,languages`)
            .then(response => {
                return response.json();
            })
            .then(countries => {
                return countries;
            })
    }

    get search() {
        return this.toSearch;
    }

    set search(newToSearch) {
        this.toSearch = newToSearch;
    }
}