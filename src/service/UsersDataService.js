import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "http://localhost:8765/aaservice";
// var headers = {
//     'Content-Type': 'application/json',
//     }
class UsersDataService {
    
    
    validateLogin(userName, password){
        // return axios.get(`${apiBaseUrl}/validateLogin/${userName}/${password}`)
        return axios.get(`http://localhost:8765/aaservice/validateLogin/${userName}/${password}`)
    }

    getPermission(userName){
        // return axios.get(`${apiBaseUrl}/permByUserName/ADMIN`)
        return axios.get(`http://localhost:8765/aaservice/permByUserId/${userName}`)
    }

    getAllUser(){
        // return axios.get(`${apiBaseUrl}/users/`)
        return axios.get(`http://localhost:8765/aaservice/users`)
    }
    getAllCandidates(userName){
       return axios.get(`http://localhost:8765/srvservice/candidateReport/${userName}`,{headers: {
            'Access-Control-Allow-Origin': '*',
          },})
    }
    download(userId,challengeid){
        return axios.get(`http://localhost:8765/srvservice/subjResReport/${userId}/${challengeid}`,{headers: {
            'Access-Control-Allow-Origin': '*',
          },responseType: 'blob',})
    }
    getAllRequests(){
        return axios.get(`http://localhost:8765/srvservice/schedule/request`,{headers: {
             'Access-Control-Allow-Origin': '*',
           },})
     }
    deleteUser(id) {
        //return axios.delete(`${apiBaseUrl}/user/${id}`);
        return axios.delete(`http://localhost:8765/aaservice/user/${id}`);
    }

    retrieveUsers(id) {
        return axios.get(`${apiBaseUrl}/user/${id}`);
    }

    retrieveUserByUserId(id) {
        //return axios.get(`${apiBaseUrl}/user/uname/${id}`);
        return axios.get(`http://localhost:8765/aaservice/user/userid/${id}`);
    }

    updateUser(id, user) {
        //console.log('executed service')
        return axios.put(`${apiBaseUrl}/user/${id}`, user);
    }

    updateUserUsingUserId(id, user) {
        //console.log('executed service')
        //return axios.put(`${apiBaseUrl}/user/uname/${id}`, user);
        return axios.put(`http://localhost:8765/aaservice/user/userid/${id}`, user);
    }
    createUser(user) {
        console.log('Create User',user);
        // return axios.post(`${apiBaseUrl}/user`, user);
        return axios.post(`http://localhost:8765/aaservice/user`, user);
    }

    retrieveUsersByRole(roleId){
        // return axios.get(`${apiBaseUrl}/users/`)
        return axios.get(`http://localhost:8765/aaservice/usersByRole/${roleId}`)
    }
    getInterviewer(){
            return axios.get(`http://localhost:8765/aaservice/usersByRole/INTERVIEWER`,{headers: {
                 'Access-Control-Allow-Origin': '*',
               },})
    }
    sendToInterviewers(user, challengeid) {
        console.log('Create User');
        // return axios.post(`${apiBaseUrl}/user`, user);
        return axios.post(`http://localhost:8765/srvservice/send/candidate/report/${challengeid}`, user);
    }
	updateRolePermission(roleId, permissionDTO) {
        //console.log('executed service')
        //return axios.put(`${apiBaseUrl}/user/uname/${id}`, user);
        return axios.put(`http://localhost:8081/permission/${roleId}`, permissionDTO);
    }

    getPermissionIdByRole(roleId){
        // return axios.get(`${apiBaseUrl}/users/`)
        return axios.get(`http://localhost:8081/permissionByRole/${roleId}`)
    }

}

export default new UsersDataService()