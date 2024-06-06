import axiosInstance from "@/services/axiosConfig";

interface ProfileData {
  username: string;
  birthday: string;
}

interface ChangePasswordData {
  old_password: string;
  new_password: string;
}

interface CreditData {
  amount: number;
}

const UserService = {
  updateProfile: async (id: string | null, profileData: ProfileData) => {
    const response = await axiosInstance.put(`/users/${id}`, profileData);
    return response.data;
  },

  changePassword: async (
    id: string | null,
    passwordData: ChangePasswordData
  ) => {
    await axiosInstance.put(`/users/${id}/password`, passwordData);
  },

  getProfile: async (id: string | null) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  creditUser: async (id: string | null, creditData: CreditData) => {
    const response = await axiosInstance.post(
      `/users/${id}/credit`,
      creditData
    );
    return response.data;
  },

  subscribeUser: async (id: string | null | undefined) => {
    const response = await axiosInstance.post(`/users/${id}/subscribe`);
    return response.data;
  },

  checkSubscribed: async (id: string | null) => {
    const response = await axiosInstance.post(`/users/${id}/subscribed`);
    return response.data;
  },
};

export default UserService;
