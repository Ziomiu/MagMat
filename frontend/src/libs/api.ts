import axios from "axios";
import { useNavigate } from "react-router-dom";

export const api = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};
export const getAccessToken = () => {
  return accessToken;
};

api.interceptors.request.use(
  async (conifg) => {
    if (accessToken) {
      conifg.headers.Authorization = `Bearer ${accessToken}`;
    }
    return conifg;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const orgRequest = error.config;

    if (error.response?.status === 404 && orgRequest._retry) {
      orgRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:8080",
          {},
          { withCredentials: true },
        );
        const newAccessToken = res.data.access_token;
        setAccessToken(newAccessToken);
        orgRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(orgRequest);
      } catch (refreshError) {
        const navigate = useNavigate();
        console.error("Token refresh failed: ", refreshError);
        setAccessToken(null);
        navigate("/login");
      }
    }
  },
);
