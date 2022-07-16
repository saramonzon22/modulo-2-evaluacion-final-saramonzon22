'use strict';

const searchButton = document.querySelector('.button-js-search');
const resetButton = document.querySelector('.button-js-reset');
const inputSearch = document.querySelector('.input-search-js');
const searchResult = document.querySelector('.search-js');
const containerSearch = document.querySelector('.container-search-js');

let animeSearchList = [];
let animeSearchFav = [];

function resetSearch(event) {
  event.preventDefault();
  inputSearch.value = '';

}
/* function searchFunction (event){
  event.preventDefault();
} */
// acordarte de borrar
/* const handleClick() = (event) => {
  event.preventDefault();
  const inputSearchUp = inputSearch.value.toLowerCase();
  const inputSearchFilter = animeSearchList.filter((newSearch) => newSearch.title.toLowerCase().includes(inputSearchUp));
  renderAnime(inputSearchFilter);

} */

function favAnime(event) {
  console.log(event.currentTarget.id);
  const animeId = event.currentTarget.title;
  const animeIdfound = animeSearchList.find((anime) => anime.title === animeId);
  const favouritesAnime = animeSearchFav.findIndex((animeFavSearch) => animeFavSearch.title === animeId);
  if (favouritesAnime === -1) {
    animeSearchFav.push(animeIdfound);
  } else {
    animeSearchFav.splice(favouritesAnime, 1);
  }

}

function handleClick(event) {
  event.preventDefault();
  const inputSearchAnime = inputSearch.value.toLowerCase();
  fetch(`https://api.jikan.moe/v4/anime?q=${inputSearchAnime}`)
    .then((response) => response.json())
    .then((animeSearch) => {
      animeSearch = animeSearch.data;
      localStorage.setItem('animeSearch', (JSON.stringify(animeSearch)));
      renderAnime(animeSearch);

    });
}

function renderAnime(animeDefinitive) {
  let html = '';
  let containerFav = '';
  for (const singleAnime of animeDefinitive) {
    const favAnimeFound = animeSearchFav.findIndex((fav) => singleAnime.title === fav.title);
    if (favAnimeFound !== -1) {
      containerFav = 'favorite';
    } else {
      containerFav = '';
    }

    if (singleAnime.images.jpg.small_image_url !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
      html += `<li class="list-anime list-anime-js ${containerFav}"><h2 class="title2">${singleAnime.title}</h2><img class="img-list" src=${singleAnime.images.jpg.image_url}></li>`;
    } else {
      html += `<li class="list-anime list-anime-js"><h2 class="title2">${singleAnime.title}</h2><img class="img-list" src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV'></li>`;
    }

  }
  searchResult.innerHTML = html;
  animeListen();

}
function animeListen() {
  const listAnimeJs = document.querySelectorAll('.list-anime-js');
  for (const oneAnime of listAnimeJs) {
    oneAnime.addEventListener('click', favAnime);
  }
}

resetButton.addEventListener('click', resetSearch);
searchButton.addEventListener('click', handleClick, renderAnime);


