import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://team-hacktopus.onrender.com',
    headers:{
        "Content-Type":'application/json',
    },
    withCredentials:true,
})
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  
export default axiosInstance;