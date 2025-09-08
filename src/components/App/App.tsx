import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

export default function App() {
  const [filmes, setFilmes] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOrder = async (topic: string) => {
    try {
      setError(false);
      setLoading(true);
      setFilmes([]);
      const data = await fetchMovies(topic);
      setFilmes(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: number) => {
    const movie = filmes.find((m) => m.id === id);
    if (movie) {
      setSelectedMovie(movie);
    }
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleOrder} />
      {loading && <Loader />}
      {error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={filmes} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </div>
  );
}
