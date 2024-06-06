import axiosInstance from "@/services/axiosConfig";

interface PurchaseData {
  user_id: string | undefined;
  movie_id: string | undefined;
}

export interface Movie {
  id: number;
  title: string;
  poster_url: string;
}

export interface Category {
  title: string;
  movies: Movie[];
}

const MovieService = {
  purchaseMovie: async (purchaseData: PurchaseData | undefined) => {
    await axiosInstance.post(`/movies/purchase`, purchaseData);
  },

  checkPurchased: async (purchaseData: PurchaseData | undefined) => {
    const response = await axiosInstance.post(
      `/movies/purchased`,
      purchaseData
    );
    return response.data;
  },

  getMovieDetails: async (movie_id: string | undefined) => {
    const response = await axiosInstance.get(`/movies/${movie_id}`);
    return response.data;
  },

  fetchMovies: async (page: number): Promise<Movie[]> => {
    const response = await axiosInstance.get("/movies", {
      params: { page, size: 50 },
    });
    const data = response.data.content;
    return data
      .map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        poster_url: movie.poster_url,
      }))
      .slice(0, 50);
  },

  fetchMoviesByName: async (
    letters: string | null,
    page: number
  ): Promise<Movie[]> => {
    const response = await axiosInstance.get("/movies/findByName", {
      params: { letters, page, size: 50 },
    });
    console.log(response.data);
    const data = response.data.content;
    return data.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_url: movie.poster_url,
    }));
  },

  fetchMoviesByTag: async (
    tagLabel: string,
    page: number
  ): Promise<Movie[]> => {
    const response = await axiosInstance.get(`/movies/tags`, {
      params: { tagLabel, page, size: 50 },
    });
    const data = response.data.content;
    return data.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_url: movie.poster_url,
    }));
  },
};

export default MovieService;
