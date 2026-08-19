// import axios from 'axios';
// import Cookies from 'js-cookie';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
// });

// // Add a request interceptor to include the token in headers
// api.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// export default api;









// import axios from 'axios';
// import Cookies from 'js-cookie';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // ================= REQUEST INTERCEPTOR =================
// api.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('token');

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // ================= RESPONSE INTERCEPTOR =================
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {

//         // If token expired or unauthorized → logout automatically
//         if (error.response && error.response.status === 401) {
//             Cookies.remove('token');
//             Cookies.remove('user');
//             window.location.href = '/login';
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;









// import axios from "axios";
// import Cookies from "js-cookie";

// const api = axios.create({
//     baseURL: "http://localhost:5000/api",
//     headers: {
//         "Content-Type": "application/json"
//     }
// });

// // ================= REQUEST INTERCEPTOR =================
// api.interceptors.request.use(
//     (config) => {

//         const token = Cookies.get("token");

//         if (token) {
//             config.headers = config.headers || {};
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // ================= RESPONSE INTERCEPTOR =================
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {

//         // If token expired or unauthorized → logout automatically
//         if (error.response?.status === 401) {
//             Cookies.remove("token");
//             Cookies.remove("user");

//             window.location.href = "/login";
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;











import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: "https://farmxpert-backend.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use(
    (config) => {

        const token = Cookies.get("token");

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
    (response) => response,
    (error) => {

        // If token expired or unauthorized → logout automatically
        if (error.response?.status === 401) {
            Cookies.remove("token");
            Cookies.remove("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;