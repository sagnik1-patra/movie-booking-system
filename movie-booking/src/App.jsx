import { useState } from "react";
import MovieList from "./components/MovieList";
import SeatBooking from "./components/SeatBooking";
import BookingHistory from "./components/BookingHistory";

function App() {

  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="container">

      <h1>🎬 Movie Booking System</h1>

      {!selectedMovie ? (
        <MovieList setSelectedMovie={setSelectedMovie}/>
      ) : (
        <SeatBooking movie={selectedMovie} goBack={()=>setSelectedMovie(null)}/>
      )}

      <BookingHistory/>

    </div>
  );
}

export default App;