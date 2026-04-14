import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials:true
});

let isRedirecting = false;

// REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    
    (response) => response, //If the response is successful, just return it as-is. No changes needed.
    
    async (error) => {
        const originalRequest = error.config;
        // console.log(originalRequest);

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            

            try {
                //---this is if we are using extracting refresh token from localStorage.--------
                // const refreshToken = localStorage.getItem('refreshToken');
                // // console.log('refresh->',refreshToken);

                // // f there's no refresh token at all (localStorage is empty / user never logged in properly), immediately throw an error and jump to the catch block. No point calling the API.
                // if (!refreshToken) throw new Error('No refresh token found');

                // const response = await axios.post(
                //     'http://localhost:5000/student/refreshtoken',
                //     { refreshToken }
                // );
                
                const response=await axios.post(
                    'http://localhost:5000/student/refreshtoken',{},
                    {withCredentials:true} //<----- this tells axios to send cookies
                )

                const newAccessToken = response.data.accessToken;

                //  Validate before using
                if (!newAccessToken) throw new Error('Invalid refresh response');

                localStorage.setItem('token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                // Guard against double-redirect in SPAs
                console.log("no refresh token found",refreshError.response?.status)
                if (!isRedirecting) {
                    isRedirecting = true;
                    localStorage.removeItem('token');
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userData');
                    window.location.href = '/login';//Force redirect to login page. Hard redirect (not React Router), so the entire app reloads fresh with no stale state.
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;