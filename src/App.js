import React from "react";
import "./App.css";

import Row from "./Components/Row";
import Banner from "./Components/Banner";
import request from "./request";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />

      {/* Banner */}
      <Banner />

      {/* Lista di Categorie */}
      <Row
        title="NETFLIX ORIGINALS"
        fetchURL={request.fetchNetflixOriginals}
        isLarge
      />
      <Row title="Trending Now" fetchURL={request.fetchTrending} />
      <Row title="Top Rated" fetchURL={request.fetchTopRated} />
      <Row title="Action Movies" fetchURL={request.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={request.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={request.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={request.fetchDocumentaries} />
    </div>
  );
}

export default App;
