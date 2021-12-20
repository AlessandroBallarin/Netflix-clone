import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "http://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  /* Ogni volta che questo elemento viene caricato esegue questo codice */
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    heihgt: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) setTrailerUrl("");
    else
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
  };

  return (
    <div className="row">
      {/* Title */}
      <h2>{title}</h2>

      {/* List of Poster */}
      <div className="row__container">
        {/* Poster */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${base_url}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row__poster ${isLarge && "row__posterLarge"}`}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
