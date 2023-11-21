import axios from 'axios';
export const registerApi = {
    register: async (userData) => {
        try {
            const response = await axios.post('http://localhost:8086/api/user/register', userData);
            console.log('register successfully', response.data);
            return response.data;
        } catch (err) {
            console.error('register failed', err);
            throw err;
        }
    },
};

export const loginApi = {
    login: async (userData) => {
        try {
            const response = await axios.post('http://localhost:8086/api/user/login', userData);
            console.log('register successfully', response.data);
            const ApiResponse = response.data;
            const token = ApiResponse.Data.token;
            localStorage.setItem('token', token);
            console.log('token', token);
            return response.data;
        } catch (err) {
            console.error('register failed', err);
            throw err;
        }
    },
};
