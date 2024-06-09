import axiosInstance from "@/services/axiosConfig";
import axios from "axios";

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

interface AddMovieData {
  title: string;
  url: string;
  description: string;
  supplierId: number;
  poster_url: string;
  price: number;
  released_at: string;
  director: string;
  labelTag: string[];
}

interface HistoryData {
  user_id: number;
  movie_id: number;
}

interface PaginatedMovies {
  content: Movie[];
  totalPages: number;
}

const MovieService = {
  purchaseMovie: async (purchaseData: PurchaseData | undefined) => {
    await axiosInstance.post(`/movies/purchase`, purchaseData);
  },

  checkPurchased: async (purchaseData: PurchaseData) => {
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

  // fetchMovies: async (page: number): Promise<Movie[]> => {
  //   const response = await axiosInstance.get("/movies", {
  //     params: { page, size: 50 },
  //   });
  //   const data = response.data.content;
  //   return data
  //     .map((movie: any) => ({
  //       id: movie.id,
  //       title: movie.title,
  //       poster_url: movie.poster_url,
  //     }))
  //     .slice(0, 50);
  // },

  fetchMovies: async (
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedMovies> => {
    const response = await axiosInstance.get("/movies", {
      params: { page, size },
    });
    console.log(response.data);
    return response.data;
  },

  fetchTopRatedMovies: async (
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedMovies> => {
    const response = await axiosInstance.get("/movies/getTopRatedMovies", {
      params: { page, size },
    });
    return response.data;
  },

  fetchDiscoverMovies: async (
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedMovies> => {
    const response = await axiosInstance.get("/movies/discover", {
      params: { page, size },
    });
    return response.data;
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

  addNewMovie: async (addMovieData: AddMovieData) => {
    const response = await axiosInstance.post(`/movies`, addMovieData);
    return response.data;
  },

  addToHistory: async (historyData: HistoryData) => {
    try {
      const response = await axiosInstance.post(`/history`, historyData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error:",
          error.response ? error.response.data : error.message
        );
      } else if (error instanceof Error) {
        console.error("General error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  },

  getHistory: async (userId: string): Promise<Movie[]> => {
    const response = await axiosInstance.get(`/users/${userId}/history`);
    const data = response.data;
    return data.map((item: any) => ({
      id: item.movie.id,
      title: item.movie.title,
      poster_url: item.movie.poster_url,
    }));
  },
};

export default MovieService;
