import API from "./api";

export const getMovies = async () => {
  const res = await API.get("/movies");
  return res.data;
};

export const addMovie = async (movie) => {
  const res = await API.post("/movies", movie);
  return res.data;
};

export const updateMovie = async (id, movie) => {
  const res = await API.put(`/movies/${id}`, movie);
  return res.data;
};

export const deleteMovie = async (id) => {
  const res = await API.delete(`/movies/${id}`);
  return res.data;
};
