import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "http://localhost:8080/";

class UsersDataService {
    
    validateLogin(email, password){
        return axios.get(`${apiBaseUrl}/validateLogin/${email}/${password}`)
    }

    getPermission(email){
        return axios.get(`${apiBaseUrl}/permByUserName/${email}`)
    }

    getAllUser(){
        return axios.get(`${apiBaseUrl}/vehicle/vehicles/`)
    }

    deleteUser(id) {
        return axios.delete(`${apiBaseUrl}/user/${id}`);
    }

    retrieveUsers(id) {
        return axios.get(`${apiBaseUrl}/user/${id}`);
    }

    updateUser(id, user) {
        //console.log('executed service')
        return axios.put(`${apiBaseUrl}/user/${id}`, user);
    }
    createUser(user) {
        //console.log('executed service')
        return axios.post(`${apiBaseUrl}/user`, user);
    }
}

export default new UsersDataService()