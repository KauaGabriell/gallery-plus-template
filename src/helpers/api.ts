import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const fetcher = async (
	url: string,
	options: AxiosRequestConfig = {},
) => {
	const response = await api.get(url, options);
	return response.data;
};
