import axios from 'axios'

const api = axios.create({
    baseURl: 'http://localhost:5000'
})

// Take request → add Authorization header → send request

//request interceptor
axios.interceptors.request.use((config) => {
    const token = localStorage.getItems('token');
    if (token) {
        config.headers.Authorization = `Bearer $(token)`;
    }
    return config;

},
    (error) => Promise.reject(error)
)

//response interceptor

axios.interceptors.response.use((response) => response, async (error) => {
    //first (response)=>response -- means if there is response coming back then return response and if there is error then run another async function

    //get original request that failed
    const originalRequest = error.config;


    //check 401 error and we have not retried yet
    if (error.response?.status == 401 && !originalRequest._retry) {

        //first make retry true or else it will again again retry
        originalRequest._retry = true;

        try {
            //get refresh token from local storage. this is same which we shared at the time of login
            const refreshToken = localStorage.getItem('refreshToken')

            //call refreshToken api -- we will send refresh token to backend refresh token route

            const response = await axios.post('http:localhost:5000/students/refreshtoken', { refreshToken });

            //save new response
            const newAccessToken = response.data.token;

            //update new accessToken
            localStorage.setItems('token', newAccessToken)

            //update failed request by adding same new token to the same request
            originalRequest.headers.Authorization = `Bearer $(token)`;

            //Retry same API → now with new token → success
            return api(originalRequest)
        }
         catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('isLoggedIn')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }


    }
    return Promise.reject(error);
})
export default api;