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
        //console.log('executed service')htt
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8082/questionsByType/${type}`);
    }

    assignObjQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8083/bulkAssignUser`,question);
    }

    getQuestionsByTypeTech(type,tech){
        return axios.get(`http://localhost:8082/questions/type/${type}/tech/${tech}`,
        {headers: {
            'Content-Type':'application/json','access-control-allow-origin': '*'
           },
       crossdomain: true
       }
        )
    }
    addSubjectiveQuestion(subjectiveQuestionData){
        return axios.post('http://localhost:8082/add/sub/question',subjectiveQuestionData);
    }
    addObjectiveQuestion(objectiveQuestionData){
        return axios.post('http://localhost:8082/add/obj/question',objectiveQuestionData);
    }
    modifySubjectiveQuestion(qId,questionData){
        return axios.put(`http://localhost:8082/update/sub/question/${qId}`,questionData);
    }
    modifyObjectiveQuestion(qId,questionData){
        console.log("jst before calling api",questionData);
        return axios.put(`http://localhost:8082/update/obj/question/${qId}`,questionData);
    }
    getQuestionsByTech(type) {
        //console.log('getQuestionsByTech');      
        return axios.get(`http://localhost:8082/questions/tech/${type}`);
    }

    getQuestionsById(id) {
        //console.log('getQuestionsById')

        return axios.get(`http://localhost:8082/question/${id}`);
    }
}

export default new QuestionService()