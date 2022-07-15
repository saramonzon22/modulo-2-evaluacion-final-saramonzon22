'use strict';

const searchButton = document.querySelector('.button-js-search');
const resetButton = document.querySelector('.button-js-reset');
const inputSearch = document.querySelector('.input-search-js');
const searchResult = document.querySelector('.search-js');

let animeSearchList = [];
let animeSearchFav = [];

function resetSearch(event) {
  event.preventDefault();
  inputSearch.value = '';
}
/* function searchFunction (event){
  event.preventDefault();
} */
const handleUp = (event) => {
  const inputSearchUp = inputSearch.value.toLowerCase();
  const inputSearchFilter = animeSearchList.filter((newSearch) => newSearch.title_english.toLowerCase().includes(inputSearchUp));
  renderAnime(inputSearchFilter);
};

inputSearch.addEventListener('keyup', handleUp);

function searchAnime() {
  fetch(
    'https://api.jikan.moe/v4/anime'
  )
    .then((response) => response.json())
    .then((animeSearch) => {// data solo existe en esta variable local
      animeSearch = animeSearch.data;
      renderAnime(animeSearch);
    });

}




function renderAnime(animeSearch) {
  let html = '';
  for (const singleAnime of animeSearch) {
    html += `<li class="list-anime list-anime-js">`;
    html += ` <h2>'${singleAnime.title}'</h2>`;
    html += ` <img src='${singleAnime.images.jpg.small_image_url}'>`;
    html += `</li>`;
  }

  /*  si imagen es !== ${singleAnime.images.jpg.small_image_url}
    entonces src = https://via.placeholder.com/210x295/ffffff/666666/?text=TV. */
  searchResult.innerHTML = html;

}

resetButton.addEventListener('click', resetSearch);
inputSearch.addEventListener('keyup', searchAnime);


