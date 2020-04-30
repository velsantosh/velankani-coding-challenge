import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "http://localhost:8765/aaservice";
// var headers = {
//     'Content-Type': 'application/json',
//     }
class UsersDataService {
    
    
    validateLogin(userName, password){
        // return axios.get(`${apiBaseUrl}/validateLogin/${userName}/${password}`)
        return axios.get(`http://localhost:8081/validateLogin/${userName}/${password}`)
    }

    getPermission(userName){
        // return axios.get(`${apiBaseUrl}/permByUserName/ADMIN`)
        return axios.get(`http://localhost:8081/permByUserId/${userName}`)
    }

    getAllUser(){
        // return axios.get(`${apiBaseUrl}/users/`)
        return axios.get(`http://localhost:8081/users`)
    }

    deleteUser(id) {
        //return axios.delete(`${apiBaseUrl}/user/${id}`);
        return axios.delete(`http://localhost:8081/user/${id}`);
    }

    retrieveUsers(id) {
        return axios.get(`${apiBaseUrl}/user/${id}`);
    }

    retrieveUserByUserId(id) {
        //return axios.get(`${apiBaseUrl}/user/uname/${id}`);
        return axios.get(`http://localhost:8081/user/userid/${id}`);
    }

    updateUser(id, user) {
        //console.log('executed service')
        return axios.put(`${apiBaseUrl}/user/${id}`, user);
    }

    updateUserUsingUserId(id, user) {
        //console.log('executed service')
        //return axios.put(`${apiBaseUrl}/user/uname/${id}`, user);
        return axios.put(`http://localhost:8081/user/userid/${id}`, user);
    }
    createUser(user) {
        console.log('Create User',user);
        // return axios.post(`${apiBaseUrl}/user`, user);
        return axios.post(`http://localhost:8081/user`, user);
    }

    retrieveUsersByRole(roleId){
        // return axios.get(`${apiBaseUrl}/users/`)
        return axios.get(`http://localhost:8081/usersByRole/${roleId}`)
    }

    
}

export default new UsersDataService()