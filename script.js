const API_URL =
  "https://api.themoviedb.org/3/discover/movies?sort_by=popularity.desc&api_key=19698c99c99fd37101050cfd756f5f66&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=19698c99c99fd37101050cfd756f5f66&qwerry='";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
//   get initial movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overviwe } = movie;

    const movieEL = document.createElement("div");
    movieEL.classslist.add("movie");

    movieEL.innerHTML = `
        <div class="movie"> <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
               ${overviwe}

            </div>
        </div>
        `;
    main.appendChild(movieEL);
  });
}
//color function
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
