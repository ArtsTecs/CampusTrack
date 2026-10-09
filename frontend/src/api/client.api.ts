import axios, { AxiosError } from "axios";
import { ApiError } from "@/lib/errors";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL ?? "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; }>) => {
    const message =
      error.response?.data?.message ??
      (error.request ? "Cannot reach the server. Please check your internet connection." : "Something went wrong.");

    return Promise.reject(new ApiError(message, error.response?.status));
  }
)

export default apiClient;