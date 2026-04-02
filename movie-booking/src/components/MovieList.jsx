import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Pagination, Stack } from "@mui/material";
import '../App.css'
function MovieList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [isloading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const[totalPage, setTotalPage] = useState(0)
  const handlePageChange = (e, value)=>{
    setPage(value)
  }

  useEffect(() => {
    const start = (page - 1) * 20;
    axios.get("https://api.tvmaze.com/shows")
      .then(res => {
        setTotalPage(Math.ceil(res.data.length / 20));
        setMovies(res.data.slice(start, start + 20));
      });

  }, [page]);

  const handleSearch = () =>{
    if(searchQuery.trim() === ""){
      const start = (page - 1) * 20;
      axios.get("https://api.tvmaze.com/shows")
        .then(res => {
          setTotalPage(Math.ceil(res.data.length / 20));
          setMovies(res.data.slice(start, start + 20));
        });
      return
    }
    setIsLoading(true);
    axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchQuery)}`)
      .then(res =>{
        const result = res.data.map(item=>item.show)
        setMovies(result)
        setIsLoading(false)
      })
      .catch(()=>setIsLoading(false))
    
  }

  const handleKeyDown = (e) =>{
    if(e.key === "Enter") handleSearch()
  }

  return (
    <div className="pt-5 bg-[#f2cc8f]">

      {/* Search Bar */}
      <div className="flex justify-center mb-4 ">
        <div className="flex w-full max-w-md gap-2">
          <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
              </span>
              <input 
              type="text" 
              placeholder="Search movies or shows"
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="w-full pl-10 py-2 pr-4 rounded-xl border-2 border-[#3db405b]/30 bg-white/80
              shadow-md focus:outline-none  focus:border-[#e07a5f] focus:ring-2 focus:ring-[#e07a5f]/3 text-[#3d405b] placeholder-gray-400 transition-all duration-200 
              "
              />
          </div>
          <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#e07a5f] text-white
          rounded-xl font-semibold shadow-md hover:bg-[#c8604c] active:scale-95 cursor-pointer transition-all duration-200
          ">
            Search
          </button>
        </div>
      </div>

      {isloading &&
        <p className="font-semibold text-[#59595e] mb-2 text-center">
          Searching.....
        </p>
      }

      {!isloading && movies.length === 0 && searchQuery && (
        <p className="text-red-500 fixed text-3xl top-1/2 left-2/5 font-semibold mb-2 text-center">
          Result Not Found
        </p>
      )}
      <div className="movie-grid grid grid-cols-5">

        {movies.map(movie => (

          <div className="movie-card flex flex-col items-center text-center bg-[#f4f1de] m-2 rounded-2xl shadow-lg shadow-[#3d405b] mb-4 " key={movie.id}>

            <img className="rounded-2xl m-2 shadow-lg shadow-[#e07a5f]" src={movie.image?.medium} />

            <div className="m-2">
              <h3 className="text-xl  font-bold">{movie.name}</h3>


              <button className="border shadow-xl bg-amber-50 px-2 py-1 rounded-lg m-1 hover:bg-amber-500/40 cursor-pointer" 
              onClick={() => navigate('/booking', { state: { movie } })}
              >
                Book Ticket
              </button>
              <button className="border shadow-xl bg-amber-50 px-2 py-1 rounded-lg m-1 hover:bg-amber-500/40 cursor-pointer" 
              
              >
                <a href={`${movie?.url}`}>Watch</a>
              </button>
            </div>


          </div>

        ))}

      </div>
      <div className="flex flex-1 justify-center items-center py-3 bg-white/30">
        <Stack spacing={2}>
          <Pagination count={totalPage} onChange={handlePageChange} shape="rounded" page={page} color="primary"/>
        </Stack>
      </div>

    </div>
  );
}

export default MovieList;