'use strict';

// ELEMENTOS DEL HTML

const inputSearch = document.querySelector('.input-search-js');
const searchButton = document.querySelector('.button-js-search');
const resetButton = document.querySelector('.button-js-reset');
const searchResult = document.querySelector('.search-js');
const favouriteList = document.querySelector('.favourites');
const animeList = document.querySelector('.list-anime-js');

// VARIABLES GLOBALES

let animes = [];
let favorites = [];

// FUNCIONES

const animeRender = (animeArray) => {
  let html = '';
  let classFavorite = '';
  for (const singleAnime of animeArray) {
    const favoritesFoundIndex = favorites.findIndex(
      (fav) => fav.mal_id === singleAnime.mal_id
    );
    if (favoritesFoundIndex !== -1) {
      classFavorite = 'fav';
    } else {
      classFavorite = '';
    }
    html += `<li class="list-anime list-anime-js ${classFavorite}" id="${singleAnime.mal_id}">`;
    html += `<h2 class="title2">${singleAnime.title}</h2>`;
    if (
      singleAnime.images.jpg.small_image_url !==
      'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
    ) {
      html += `<img class="img-list" src=${singleAnime.images.jpg.image_url}>`;
    } else {
      html += `<img class="img-list" src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV'>`;
    }
    html += `</li>`;
  }
  return html;
};

const renderAnimeSearch = () => {
  let html = animeRender(animes);
  searchResult.innerHTML = html;
  listenerSerie();
};

// handle const, search y click
const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value.toLowerCase();
  getDataAPI(inputValue);
};

const handleClick = (event) => {
  const idAnime = parseInt(event.currentTarget.id);
  const animeFound = animes.find(
    (singleAnime) => singleAnime.mal_id === idAnime
  );

  const favoriteFound = favorites.findIndex((fav) => fav.mal_id === idAnime);

  if (favoriteFound === -1) {
    favorites.push(animeFound);
  } else {
    favorites.splice(favoriteFound, 1);
  }

  animeRenderFav();
};
const animeRenderFav = () => {
  let html = animeRender(favorites);
  favouriteList.innerHTML = html;
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderAnimeSearch();
};

// función que escucha

function listenerSerie() {
  const liAnime = document.querySelectorAll('.list-anime-js');
  for (const li of liAnime) {
    li.addEventListener('click', handleClick);
  }
}

// funciones con la api

const getDataAPI = (inputValue) => {
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      animes = data.data;
      renderAnimeSearch();
    });
};
const dataLS = JSON.parse(localStorage.getItem('favorites'));

function initPage() {
  if (dataLS !== null) {
    favorites = dataLS;
    animeRenderFav();
  } else {
    favouriteList.innerHTML = '';
  }
}
function resetData() {
  localStorage.removeItem('favorites');
}

resetButton.addEventListener('click', resetData);
// eventos y funciones que se ejecutan

searchButton.addEventListener('click', handleSearch);
initPage();
