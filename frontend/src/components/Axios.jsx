import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:8000/api/";
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

const getToken = () => localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : "";
const getRefreshToken = () => localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : "";
axiosInstance.interceptors.request.use(
    async (req) => {
        const token = getToken();
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
            const user = jwtDecode(token);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if (isExpired) {
                try {
                    const refreshToken = getRefreshToken();
                    const res = await axios.post(`${baseURL}refresh/`, { refresh_token: refreshToken });

                    if (res.status === 200) {
                        localStorage.setItem('access', JSON.stringify(res.data.access));
                        req.headers.Authorization = `Bearer ${res.data.access}`;
                    } else {
                       
                        localStorage.removeItem('access');
                        localStorage.removeItem('refresh');
                        window.location.href = "/login";
                    }
                } catch (error) {
                 
                    console.error("Refresh token error:", error);
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    window.location.href = "/login"; 
                }
            }
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            window.location.href = "/login"; 
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
