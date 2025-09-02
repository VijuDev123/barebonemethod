import MovieApiClient from "./MovieApiClient";

// Dependency Injection for Api Key
const apiClient = new MovieApiClient(
  "https://api.themoviedb.org/3",
  process.env.REACT_APP_API_KEY || ""
);

export default apiClient;
