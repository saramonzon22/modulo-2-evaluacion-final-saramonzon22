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
const handleUp = () => {
  const inputSearchUp = inputSearch.value.toLowerCase();
  const inputSearchFilter = animeSearchList.filter((newSearch) => newSearch.title.toLowerCase().includes(inputSearchUp));
  renderAnime(inputSearchFilter);
};



function searchAnime() {
  const inputSearchAnime = inputSearch.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${inputSearchAnime}`)
    .then((response) => response.json())
    .then((animeSearch) => {// data solo existe en esta variable local
      animeSearch = animeSearch.data;
      renderAnime(animeSearch);
    });
}

function renderAnime(animeSearch) {
  let html = '';
  for (const singleAnime of animeSearch) {
    if (singleAnime.images.jpg.small_image_url !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
      html += `<li class="list-anime list-anime-js"><h2>'${singleAnime.title}'</h2><img class="img-list" src=${singleAnime.images.jpg.image_url}></li>`;
    } else {
      html += `<li class="list-anime list-anime-js"><h2>'${singleAnime.title}'</h2><img class="img-list" src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV'></li>`;
    }

  }
  searchResult.innerHTML = html;

}

resetButton.addEventListener('click', resetSearch);
inputSearch.addEventListener('keyup', searchAnime, handleUp);


