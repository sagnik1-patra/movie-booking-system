import { useEffect, useState } from "react";
import axios from "axios";

function MovieList({ setSelectedMovie }) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    axios.get("https://api.tvmaze.com/shows")
      .then(res => {
        setMovies(res.data.slice(0,10));
      });

  }, []);

  return (
    <div>

      <h2>Available Movies</h2>

      <div className="movie-grid">

        {movies.map(movie => (

          <div className="movie-card" key={movie.id}>

            <img src={movie.image?.medium} />

            <h3>{movie.name}</h3>

            <button onClick={()=>setSelectedMovie(movie)}>
              Book Ticket
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MovieList;