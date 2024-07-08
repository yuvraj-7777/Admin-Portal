import axios from "axios";


export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};

export const RegisterUser = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/register', data);
        return response;
    } catch (error) {
        console.error('There was an error registering!', error);
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/login', data);
        const { token } = response?.data;
        saveTokenToLocalStorage(token);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const GetAllUser = async ({pageNo, limit}) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.get(
            `http://localhost:8000/getAllUser?page=${pageNo}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                   // Accept: 'application/json, text/plain, */*',
                },
                //withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const DeleteUser = async(id)=>{
    const token = getTokenFromLocalStorage();
    try {
        const resp = await axios.delete(`http://localhost:8000/delete/${id}`,  {
            headers: {
                Authorization: `Bearer ${token}`,
            },
           
        });
        console.log('User deleted successfully:', resp);
        return resp;
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

export const AddUserByAdmin = async (data) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await axios.post('http://localhost:8000/addUser', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
               
            }
        );
        return response;
    } catch (error) {
        console.error('There was an error registering!', error);
    }
};