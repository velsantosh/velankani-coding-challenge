import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "https://vcti.com:8765/aaservice";
// var headers = {
//     'Content-Type': 'application/json',
//     }
class UsersDataService {


    validateLogin(userName, password) {
        // return axios.get(`${apiBaseUrl}/validateLogin/${userName}/${password}`)
        console.log("userName-----------");
        //return axios.get(`http://vcti.com:8765/aaservice/validateLogin/${userName}/${password}`)
        return axios.get(`https://localhost:8081/validateLogin/${userName}/${password}`)
    }

    getPermission(userName) {
        console.log("getPermission",userName);
        // return axios.get(`${apiBaseUrl}/permByUserId/${userName}`)
        //return axios.get(`http://vcti.com:8765/aaservice/permByUserId/${userName}`)
        return axios.get(`https://localhost:8081/permByUserId/?userId=${userName}`,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })

    }

    getAllUser() {
        //return axios.get(`${apiBaseUrl}/users/`)
        // return axios.get(`http://vcti.com:8765/aaservice/users`);
        return axios.get(`https://localhost:8081/users`);
    }
    getAllCandidates(userName) {
        return axios.get(`https://localhost:8083/candidateReport/?candidateId=${userName}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
    }
    download(userId, challengeid) {
        return axios.get(`https://localhost:8083/subjResReport/${userId}/${challengeid}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }, responseType: 'blob',
            })
    }
    getAllRequests() {
        return axios.get(`https://localhost:8083/schedule/request`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
    }
    deleteUser(id) {
        //return axios.delete(`${apiBaseUrl}/user/${id}`);
        // return axios.delete(`http://vcti.com:8765/aaservice/user/${id}`);
        return axios.delete(`https://localhost:8081/user/${id}`);
    }

    retrieveUsers(id) {
        //return axios.get(`${apiBaseUrl}/user/${id}`);
        // return axios.get(`http://vcti.com:8765/aaservice/user/${id}`);
        return axios.get(`https://localhost:8081/user/${id}`);
    }

    retrieveUserByUserId(id) {
        // return axios.get(`${apiBaseUrl}/user/userid/${id}`);
        // return axios.get(`http://vcti.com:8765/aaservice/user/userid/${id}`);
        return axios.get(`https://localhost:8081/user/userid/${id}`);
    }

    updateUser(id, user) {
        //console.log('executed service')
        //return axios.put(`${apiBaseUrl}/user/${id}`, user);
        // return axios.put(`http://vcti.com:8765/aaservice/user/${id}`, user);
        return axios.put(`https://localhost:8081/user/${id}`, user);
    }

    updateUserUsingUserId(id, user) {
        //console.log('executed service')
        //return axios.put(`${apiBaseUrl}/user/userid/${id}`, user);
        // return axios.put(`http://vcti.com:8765/aaservice/user/userid/${id}`, user);
        return axios.put(`https://localhost:8081/user/userid/${id}`, user);
    }
    createUser(user) {
        console.log('Create User', user);
        // return axios.post(`${apiBaseUrl}/user`, user);
        // return axios.post(`http://vcti.com:8765/aaservice/user`, user);
        return axios.post(`https://localhost:8081/user`, user);
    }

    retrieveUsersByRole(roleId) {
        // return axios.get(`${apiBaseUrl}/usersByRole/${roleId}`) 
        // return axios.get(`http://vcti.com:8765/aaservice/usersByRole/${roleId}`);
        return axios.get(`https://localhost:8081/usersByRole/${roleId}`);
    }
    getInterviewer() {
        //return axios.get(`http://vcti.com:8765/aaservice/usersByRole/INTERVIEWER`,{headers: {
        return axios.get(`https://localhost:8081/usersByRole/INTERVIEWER`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }
    sendToInterviewers(user, challengeid) {
        console.log('sendToInterviewers');
        // return axios.post(`${apiBaseUrl}/user`, user);
        return axios.post(`https://localhost:8083/send/candidate/report/${challengeid}`, user);
    }
    updateRolePermission(roleId, permissionDTO) {
        console.log('executed  updateRolePermission service')
        // return axios.put(`http://vcti.com:8765/aaservice/permission/${roleId}`, permissionDTO);
        return axios.put(`https://localhost:8081/permission/${roleId}`, permissionDTO);
    }

    getPermissionIdByRole(roleId) {
        // return axios.get(`http://vcti.com:8765/aaservice/permissionByRole/${roleId}`)
        console.log("roleId", roleId)
        return axios.get(`https://localhost:8081/permissionByRole/${roleId}`)
    }

}

export default new UsersDataService()