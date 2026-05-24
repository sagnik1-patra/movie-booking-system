import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Skeleton } from 'boneyard-js/react'

import { Pagination, Stack } from "@mui/material";
import '../App.css'
import WatchHistory from "./WatchHistory/WatchHistory";
function MovieList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [isloading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const[totalPage, setTotalPage] = useState(0)
  const [suggestions, setSuggestions] = useState([]);
  const[showSuggestion, setShowSuggestion] = useState(true);
  const handlePageChange = (e, value)=>{
    setPage(value)
  }
    useEffect(() => {
      if (searchQuery.trim() === "" || !showSuggestion) {
        setSuggestions([]);
        return;
      }

      const delaySearch = setTimeout(() => {
        axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchQuery)}`)
          .then((res) => {
            const result = res.data.map((item) => item.show);
            setSuggestions(result.slice(0, 5)); 
          })
          .catch(() => setSuggestions([]));
      }, 300);
      return () => clearTimeout(delaySearch);
    }, [searchQuery, showSuggestion]);

  useEffect(() => {
    setIsLoading(true);
    const start = (page - 1) * 20;
    axios.get(`https://api.tvmaze.com/shows?page=${page}`)
      .then(res => {
        setTotalPage(Math.ceil(res.data.length / 20));
        setMovies(res.data.slice(start, start + 20));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [page]);

    const handleSearchQuery = (e) => {
      const val = e.target.value;
      setSearchQuery(val)
      setShowSuggestion(true)
      if(val.trim()===""){
        setSuggestions([]);
      }
    }
  const handleSearch = () =>{
    setSuggestions([])
    if(searchQuery.trim() === ""){
      const start = (page - 1) * 20;
      axios.get(`https://api.tvmaze.com/shows?${page}`)
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

  const handleWatch = (movie)=>{
    const stored = JSON.parse(localStorage.getItem("watchHistory")) || [];
    const isAlreadyPresent = stored.some(
      (item) => item.movie === movie.name
    );
    
    if(!isAlreadyPresent){
      const currentMovieDetail = {
        imageUrl:movie.image,
        movie: movie.name,
        date: new Date().toLocaleString()
      };
      localStorage.setItem("watchHistory", JSON.stringify([ currentMovieDetail,...stored,].slice(0,20)));
    }

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
              onChange={handleSearchQuery}
              className="w-full pl-10 py-2 pr-4 rounded-xl border-2 border-[#3db405b]/30 bg-white/80
              shadow-md focus:outline-none  focus:border-[#e07a5f] focus:ring-2 focus:ring-[#e07a5f]/3 text-[#3d405b] placeholder-gray-400 transition-all duration-200 
              "
              />
            {suggestions.length > 0 && (
    <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-xl z-50 overflow-hidden">
      {suggestions.map((movie) => (
        <div
          key={movie.id}
          className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setMovies([movie]);
            setSuggestions([]);
            setSearchQuery(movie.name);
            setShowSuggestion(false);
          }}
        >
          <img
            src={movie.image?.medium}
            alt={movie.name}
            className="w-12 h-16 object-cover rounded"
          />

          <p className="font-medium">{movie.name}</p>
        </div>
      ))}
    </div>
  )}
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
      <Skeleton 
      name="movies-card" 
      animate="shimmer"
      color="#FFF8DC"
      darkColor="#2c2c2c" 
      loading={isloading} 
      transition={true}
      stagger={true}
      >
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
              onClick={()=>handleWatch(movie)}
              >
                <a href={`${movie?.url}`}>Watch</a>
              </button>
              </div>
            </div>
          ))}
        </div>
      </Skeleton>
      <div className="flex flex-1 justify-center items-center py-3 bg-white/30">
        <Stack spacing={2}>
          <Pagination count={totalPage} onChange={handlePageChange} shape="rounded" page={page} color="primary"/>
        </Stack>
      </div>

    </div>
  );
}

export default MovieList;