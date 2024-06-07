import axiosInstance from "@/services/axiosConfig";

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

const SupplierService = {
  addNewMovie: async (addMovieData: AddMovieData) => {
    const response = await axiosInstance.post(`/movies`, addMovieData);
    return response.data;
  },
};

export default SupplierService;
