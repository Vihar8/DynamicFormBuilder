import axios from "axios";
import { commonLoader } from "./commonEnum";

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL  || "localhost:8000/api/",
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("serviceToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      !window.location.href.includes("/login")
    ) {
      window.location = "/maintenance/500";
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);

export default axiosServices;

export const fetcher = async (args) => {
  commonLoader("show");
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosServices.get(url, { ...config });
  commonLoader("hide");
  return res.data;
};

export const fetcherPost = async (args) => {
  commonLoader("show");
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });
  commonLoader("hide");
  return res.data;
};

export const fetcherPostFormData = async (args) => {
  commonLoader("show");
  const [url, config, headers = {}] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, config, headers);
  commonLoader("hide");
  return res.data;
};

export const fetcherDownload = async (args) => {
	commonLoader("show");
	// Extract URL and config from args
	const [url, config = {}, headers = {}] = Array.isArray(args) ? args : [args];
	// Pass the config directly to Axios
	const res = await axiosServices.post(url, config, headers);
	commonLoader("hide");
	return res;
};
