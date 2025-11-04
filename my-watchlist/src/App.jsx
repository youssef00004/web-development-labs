import { useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  return (
    <div className="app">
      <h1>Movies Watch List</h1>
      <MovieForm addMovie={addMovie} />
      <MovieList movies={movies} deleteMovie={deleteMovie} />
    </div>
  );
}

export default App;
