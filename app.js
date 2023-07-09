/*==========SELECTORS============*/


/*BODY*/
const body = document.querySelector('[data-body]')

/*HEADER*/
const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-navbar]');
const title = document.querySelector('[data-title]');
const mode = document.querySelector('[data-mode]');

/*SECTION 1*/
const searchSection = document.querySelector('[data-section-1]');
const searchBar = document.querySelector('[data-search]');

const filterDiv = document.querySelector('[data-filter-div]');
const filterRegionsButton = document.querySelector('[data-filter-regions]');
const filterRegionsButtonsList = document.querySelector('[data-filter-buttons-list]');
const filterButton = document.querySelectorAll('[data-filter-button]');

/*SECTION 2*/

const countryCardTemplate = document.querySelector('[data-country-card-template]');

const cardSection = document.querySelector('[data-section-2]');
const countryCard = document.querySelector('[data-country-card-container]')
const countryCardImageDiv = document.querySelector('[data-country-card-image-div]');
//const countryCardImage = document.querySelector('[data-country-card-image]');

const countryCardInfoDiv = document.querySelector('[data-country-info-div]');
//const countryCardName = document.querySelector('[data-country-info-name]');
//const countryCardPopulation = document.querySelector('[data-country-info-population]');
//const countryCardRegion = document.querySelector('[data-country-info-region]');
//const countryCardCapital = document.querySelector('[data-country-info-capital]');

/*SECTION 3*/

const countryPageTemplate = document.querySelector('[data-country-page-template]');


const pageSection = document.querySelector('[data-section-3]');
const countryPageMain = document.querySelector('[data-country-page]')

const goBackDiv = document.querySelector('[data-go-back-div]');
const goBackButton = document.querySelector('[data-go-back-button]');

//const countryPage = document.querySelector('[data-country-page-div]');

const countryPageImageDiv = document.querySelector('[data-country-page-image-div]');
//const countryPageImage = document.querySelector('[data-country-page-image]');

const countryPageInfoDiv = document.querySelector('[data-country-page-information-div]');
const countryPageNameDiv = document.querySelector('[data-country-page-name-div]');
//const countryPageName = document.querySelector('[data-country-page-name]');

const countryPageListsDiv = document.querySelector('[data-country-page-lists-div]');
const countryPageList1Div = document.querySelector('[data-country-page-list-1-div]');
const countryPageList1 = document.querySelector('[data-country-page-list-1]');
//const countryPageNativeName = document.querySelector('[data-country-page-native-name]');
//const countryPagePopulation = document.querySelector('[data-country-page-population]');
//const countryPageRegion = document.querySelector('[data-country-page-region]');
//const countryPageSubregion = document.querySelector('[data-country-page-subregion]');
//const countryPageCapital = document.querySelector('[data-country-page-capital]');

const countryPageList2Div = document.querySelector('[data-country-page-list-2-div]');
const countryPageList2 = document.querySelector('[data-country-page-list-2]');
//const countryPageTld = document.querySelector('[data-country-page-tld]');
//const countryPageCurrencies = document.querySelector('[data-country-page-currencies]');
//const countryPageLanguages = document.querySelector('[data-country-page-languages]');

const countryPageBorderCountriesDiv = document.querySelector('[data-country-page-border-countries-div]');
const countryPageBorderCountriesP = document.querySelector('[data-country-page-border-countries-p]');
const countryPageBorderCountriesList = document.querySelector('[data-country-page-border-countries-list]');
//const countryPageBorderCountriesButton = document.querySelectorAll('[data-country-page-border-countries-button]');



/*======ASYNC FUNCTION TO FETCH COUNTRY DATA========*/
const getCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    return countries;
}

let countriesArray = [];
let containerArray = [];

getCountries().then(countries => {
    countriesArray = countries.map(country => organizeData(country));
    containerArray = countriesArray.map(country => displayCountryCard(country));
})



/*========FUNCTIONS======*/

function organizeData(data){
        if(data.capital === undefined) data.capital = '/';
        if(data.name.nativeName === undefined) data.name.nativeName = '/';
        if(data.tld === undefined) data.tld = '/';
        if(data.currencies === undefined) data.currencies = '/'
        if(data.languages === undefined) data.languages = '/'

        return{
            flag: data.flags.svg,
            name: data.name.common,
            population: data.population,
            region: data.region,
            capital: data.capital[0],
            nativeName: Object.values(data.name.nativeName)[0].common,
            subRegion: data.subregion,
            topLevelDomain: data.tld[0],
            currency: data.currencies[Object.keys(data.currencies)[0]].name,
            languages: Object.values(data.languages).join(', '),
            borders: data.borders,
            cca3: data.cca3,
        }
}

function displayCountryCard(data){
    const countryCard = countryCardTemplate.content.cloneNode(true).children[0];
    const countryCardImage = countryCard.querySelector('[data-country-card-image]');
    const countryCardName = countryCard.querySelector('[data-country-info-name]');
    const countryCardPopulation = countryCard.querySelector('[data-country-info-population]');
    const countryCardRegion = countryCard.querySelector('[data-country-info-region]');
    const countryCardCapital = countryCard.querySelector('[data-country-info-capital]');

    countryCardImage.src = `${data.flag}`;
    countryCardName.textContent = data.name;
    countryCardPopulation.textContent += data.population;
    countryCardRegion.textContent += data.region;
    countryCardCapital.textContent += data.capital;
    
    cardSection.appendChild(countryCard);

    countryCard.addEventListener('click', () =>{
        if(countryPageMain.hasChildNodes()){
            countryPageMain.removeChild(countryPageMain.children[0])
        }
        displayCountryDetails(data)
        searchSection.classList.toggle('inactive');
        cardSection.classList.toggle('inactive');
        pageSection.classList.toggle('inactive')
    })
    return {container: countryCard}
}

function displayCountryDetails(data){

    const countryPage = countryPageTemplate.content.cloneNode(true).children[0];
    const countryPageImage = countryPage.querySelector('[data-country-page-image]');
    const countryPageName = countryPage.querySelector('[data-country-page-name]');
    const countryPageNativeName = countryPage.querySelector('[data-country-page-native-name]');
    const countryPagePopulation = countryPage.querySelector('[data-country-page-population]');
    const countryPageRegion = countryPage.querySelector('[data-country-page-region]');
    const countryPageSubregion = countryPage.querySelector('[data-country-page-subregion]');
    const countryPageCapital = countryPage.querySelector('[data-country-page-capital]');
    const countryPageTld = countryPage.querySelector('[data-country-page-tld]');
    const countryPageCurrencies = countryPage.querySelector('[data-country-page-currencies]');
    const countryPageLanguages = countryPage.querySelector('[data-country-page-languages]');
    const countryPageBorderCountriesList = countryPage.querySelector('[data-country-page-border-countries-list]');
    
    countryPageImage.src = `${data.flag}`;
    countryPageName.textContent = data.name;
    countryPageNativeName.textContent += data.nativeName;
    countryPagePopulation.textContent += data.population;
    countryPageRegion.textContent += data.region;
    countryPageCapital.textContent += data.capital;
    countryPageSubregion.textContent += data.subRegion;
    countryPageTld.textContent += data.topLevelDomain;
    countryPageCurrencies.textContent += data.currency;
    countryPageLanguages.textContent += data.languages;

    countryPageMain.appendChild(countryPage);

    let bordersForThisCountry = data.borders;
    if(bordersForThisCountry === undefined) return 
    countriesArray.forEach(country => {
        if(bordersForThisCountry.includes(country.cca3)){
            const borderButton = document.createElement('button');
            borderButton.classList.add('border-country-btn')
            borderButton.innerText = country.name;
            borderButton.value = country.name;
            countryPageBorderCountriesList.appendChild(borderButton);

            borderButton.addEventListener('click', e =>{
                let value = e.target.value;
                displayCountryDetails(country)
                if(countryPageMain.hasChildNodes()){
            countryPageMain.removeChild(countryPageMain.children[0])
        }
            })
            
    } else return
    })
}

/*========EVENT LISTENERS======*/

// Search by name of the country or the capital
searchBar.addEventListener('keydown', (e) =>{
    let inputValue = e.target.value.toLowerCase();
    containerArray.forEach(element => {
        let countryName = element.container.children[1].firstElementChild.outerText;
        let capitalName = element.container.children[1].lastElementChild.outerText.slice(9);
        const visible = countryName.toLowerCase().includes(inputValue) || capitalName.toLowerCase().includes(inputValue);
        element.container.classList.toggle('inactive', !visible);
    })
})

// Filter by region
filterButton.forEach(button => button.addEventListener('click', () =>{
    let value = button.value;
    containerArray.forEach(element => {
        let region = element.container.children[1].children[2].innerText.slice(7);
        let visible = region.toLowerCase().includes(value);
        element.container.classList.toggle('inactive', !visible)
    })
    filterRegionsButtonsList.classList.toggle('inactive');
}))

// Close dropdown menu when you click on a region
filterRegionsButton.addEventListener('click', () => {
    filterRegionsButtonsList.classList.toggle('inactive');
})

// Go back to see all country cards
goBackButton.addEventListener('click', () => {
    cardSection.classList.toggle('inactive');
    searchSection.classList.toggle('inactive');
    pageSection.classList.toggle('inactive');
})

// Switch between light and dark mode
mode.addEventListener('click', () => {
    if(mode.textContent === 'Dark mode')
    mode.textContent = 'Light mode';
    else mode.textContent = 'Dark mode';
    body.classList.toggle('switched');
})

