import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { fetchFilms } from "../../services/movieService";

export default function App() {
  const [filmes, setFilmes] = useState();

  const handleOrder = async (topic: string) => {
    const data = await fetchFilms(topic);
    setFilmes(data);
    console.log(filmes);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleOrder} />
    </div>
  );
}
