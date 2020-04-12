import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "http://localhost:8765/aaservice";
// var headers = {
//     'Content-Type': 'application/json',
//     }
class QuestionService {
    
    
    addQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8082/subQuestion`,question,{
            headers: {
              'Content-Type': `multipart/form-data; boundary=${question._boundary}`,
            }});
    }

    addObjQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8082/question`,question);
    }

    updateUser(id, user) {
        //console.log('executed service')
        return axios.put(`${apiBaseUrl}/user/${id}`, user);
    }
    getQuestions() {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8082/questions`);
    }

    getQuestionsByType(type) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8082/questionsByType/${type}`);
    }

    assignObjQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8083/bulkAssignUser`,question);
    }
}

export default new QuestionService()