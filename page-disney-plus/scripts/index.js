const API_KEY = "fe72f214d62869bea6b720726f0d1807";
const API_LANGUAGE = "pt-br";
const BASE_URL_IMAGE = {
  original: "https://image.tmdb.org/t/p/original",
  small: "https://image.tmdb.org/t/p/w500",
};

const movies = [];
let movieActive;
const buttonMenu = document.querySelector(".button-menu");
buttonMenu.addEventListener("click", toggleButtonMenu);

const moviesList = document.getElementById("movies__list");
const moviesElement = document.getElementById("navigation__movies");

function toggleButtonMenu() {
  const navigationMenu = document.querySelector(".navigation");

  navigationMenu.classList.toggle("active");
  buttonMenu.classList.toggle("active");
}

function getUrlMovie(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
}

function setMainMovie(movie) {

  if(!movieActive){
    movieActive = movie.id;
  }
  
  changeMovieActiveInList(movie.id);
  
  const appImage = document.querySelector(".app__image img");
  const rating = document.querySelector(".feature-movie__rating b");
  const title = document.querySelector(".feature-movie h1");
  const infos = document.querySelector(".feature-movie span");
  const description = document.querySelector(".feature-movie p");

  rating.innerHTML = movie.vote_average;
  title.innerHTML = movie.title;
  description.innerHTML = movie.overview;
  infos.innerHTML = movie.yearReleased + " - " + movie.genre + " - Movie";

  appImage.setAttribute("src", movie.image.original);

  // app.style.backgroundImage = `linear-gradient(90deg, rgba(13, 22, 46, 0.8) 23.21%, rgba(13, 22, 46, 0.00) 96.69%), url('${image}')`;
}

function changeMovieActiveInList(movieActiveId) {

  const movieActiveCurrent = document.getElementById(movieActive);
  movieActiveCurrent.classList.remove("movie--active");

  const movieActiveNew = document.getElementById(movieActiveId);
  movieActiveNew.classList.add("movie--active");

  movieActive = movieActiveId;
}

function changeMainMovie(movieId) {

  const movie = movies.find((movie) => movie.id === movieId);

  toggleButtonMenu();
  setMainMovie(movie);
}

function createButtonMovie(movieId) {
  const button = document.createElement("button");
  button.addEventListener("click", () => changeMainMovie(movieId));
  button.setAttribute("type", "button");
  button.innerHTML = `<img src="./assets/icon-play-button.png" alt="Icon Play">`;

  return button;
}

function createImageMovie(movieImage, movieTitle) {
  const imageMovieDiv = document.createElement("div");
  imageMovieDiv.classList.add("movie__image");

  const image = document.createElement("img");
  image.setAttribute("src", movieImage);
  image.setAttribute("alt", `Imagem de fundo do filme ${movieTitle}`);
  image.setAttribute("loading", "lazy");

  imageMovieDiv.appendChild(image);

  return imageMovieDiv;
}

function addMovieInList(movie) {
  const movieElement = document.createElement("li");
  const title = `<strong>${movie.title}</strong>`;
  const genres = `<span>${movie.genre}</span>`;

  movieElement.setAttribute("id", movie.id);
  movieElement.classList.add("movie");
  movieElement.innerHTML = genres + title;
  movieElement.appendChild(createButtonMovie(movie.id));
  movieElement.appendChild(createImageMovie(movie.image.small, movie.title));

  moviesElement.appendChild(movieElement);
}

function getMovieData(movie){
  fetch(getUrlMovie(movie))
  .then((response) => response.json())
  .then((data) => {
    const movieData = {
      id: movie,
      title: data.title,
      genre: data.genres[0].name,
      overview: data.overview,
      vote_average: data.vote_average.toFixed([1]),
      yearReleased: data.release_date.split("-")[0],
      image: {
        original: BASE_URL_IMAGE.original.concat(data.backdrop_path),
        small: BASE_URL_IMAGE.small.concat(data.backdrop_path),
      },
    };

    movies.push(movieData);
    addMovieInList(movieData);
    
  });
}


function loadMovies() {
  const LIST_MOVIES = [
    "tt12801262",
    "tt4823776",
    "tt0800369",
  ];

  const fetchPromises = LIST_MOVIES.map((movie, index) => {
    fetch(getUrlMovie(movie))
      .then((response) => response.json())
      .then((data) => {
        const movieData = {
          id: movie,
          title: data.title,
          genre: data.genres[0].name,
          overview: data.overview,
          vote_average: data.vote_average.toFixed([1]),
          yearReleased: data.release_date.split("-")[0],
          image: {
            original: BASE_URL_IMAGE.original.concat(data.backdrop_path),
            small: BASE_URL_IMAGE.small.concat(data.backdrop_path),
          },
        };

        movies.push(movieData);

        addMovieInList(movieData);

        if (index === LIST_MOVIES.length - 1) {
          setMainMovie(movies[Math.floor(Math.random() * movies.length)]);
        }
      });
  });
}

const addMovieForm = document.getElementById('add-movie');

addMovieForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newMovie = event.target['movie'].value;
  getMovieData(newMovie);

})



loadMovies();
