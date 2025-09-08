import axios from "axios";
import type { Movie, MovieApiResponse } from "../types/movie";

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