import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response = await api.get<MovieApiResponse>("/search/movie", {
      params: {
        query,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
};