import axiosInstance from "@/services/axiosConfig";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  birthday: string;
  role_id: number;
}

interface SignInFormData {
  username: string;
  password: string;
}

interface ResetPasswordFormData {
  email: string;
  password: string;
  code: string;
}

const AuthService = {
  signup: async (formData: SignUpFormData) => {
    await axiosInstance.post("/users/signup", formData);
  },

  activate: async (email: string, code: string) => {
    await axiosInstance.post("/users/activate", { email, code });
  },

  resendActivationCode: async (email: string) => {
    await axiosInstance.post("/users/activate/new", { email });
  },

  signin: async (formData: SignInFormData) => {
    const response = await axiosInstance.post("/users/signin", formData);
    return response.data;
  },

  sendResetPasswordEmail: async (email: string) => {
    await axiosInstance.post("/users/password/reset", { email });
  },

  resetPassword: async (formData: ResetPasswordFormData) => {
    await axiosInstance.post("/users/password/new", formData);
  },

  signout: async () => {
    await axiosInstance.post("/users/signout");
  },
};

export default AuthService;
