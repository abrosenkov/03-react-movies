import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/authentication',
  headers: {accept: 'application/json'}
};

export const fetchFilms = async (topic: string) => {
    const response = await axios.request(options);
    console.log(topic);
    return response.data;
}