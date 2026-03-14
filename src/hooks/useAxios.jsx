import axios from 'axios';
import React from 'react';
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_local_url
  baseURL: import.meta.env.VITE_live_url,
});
const useAxios = () => {
    return axiosInstance
};

export default useAxios;