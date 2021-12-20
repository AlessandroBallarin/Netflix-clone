import React, { useEffect, useState } from "react";
import "./Banner.css";
import istance from "../axios";
import request from "../request";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

function Banner() {
  const [movie, setMovie] = useState([]);

  const baseURL = "http://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const requests = await istance.get(request.fetchNetflixOriginals);
      setMovie(
        requests.data.results[
          Math.floor(Math.random() * requests.data.results.length - 1)
        ]
      );
      return requests;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__container">
        {/* Titolo */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.originals_name}
        </h1>
        {/* Bottoni */}
        <div className="banner__buttons">
          <button className="banner__button">
            <span>
              <PlayArrowRoundedIcon />
              Play
            </span>
          </button>
          <button className="banner__button">
            <span>
              <AddRoundedIcon />
              My List
            </span>
          </button>
        </div>
        {/* Descrizione */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
