import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "http://localhost:8765/aaservice";
// var headers = {
//     'Content-Type': 'application/json',
//     }
class QuestionService {


    addQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8765/cctservice/subQuestion`, question, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${question._boundary}`,
            }
        });
    }

    addObjQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8765/cctservice/question`, question);
    }

    updateUser(id, user) {
        //console.log('executed service')
        return axios.put(`${apiBaseUrl}/user/${id}`, user);
    }
    getQuestions() {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8765/cctservice/questions`);
    }

    getQuestionsByType(type) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8765/cctservice/questionsByType/${type}`);
    }

    assignObjQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8765/srvservice/bulkAssignUser`, question);
    }

    retrieveAllTechnology() {
        // return axios.get(`${apiBaseUrl}/technologies/`)
        return axios.get(`http://localhost:8765/cctservice/technologies`)
    }

    getQuestionsByTypeTech(type, tech) {
        return axios.get(`http://localhost:8765/cctservice/questions/type/${type}/tech/${tech}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'access-control-allow-origin': '*'
                },
                crossdomain: true
            }
        )
    }

    getAllSchQuestionsByUserId(userId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8765/srvservice/schQuesByUid/${userId}`);

    }

    addSubjectiveQuestion(subjectiveQuestionData) {
        return axios.post('http://localhost:8765/cctservice/add/sub/question', subjectiveQuestionData);
    }
    addObjectiveQuestion(objectiveQuestionData) {
        return axios.post('http://localhost:8765/cctservice/add/obj/question', objectiveQuestionData);
    }
    modifySubjectiveQuestion(qId, questionData) {
        return axios.put(`http://localhost:8765/cctservice/update/sub/question/${qId}`, questionData);
    }
    modifyObjectiveQuestion(qId, questionData) {
        console.log("jst before calling api", questionData);
        return axios.put(`http://localhost:8765/cctservice/update/obj/question/${qId}`, questionData);
    }
    getQuestionsByTech(tech) {
        console.log('getQuestionsByTech------------', tech);
        return axios.get(`http://localhost:8765/cctservice/questions/tech/${tech}`);
    }

    getQuestionsById(id) {
        //console.log('getQuestionsById')

        return axios.get(`http://localhost:8765/cctservice/question/${id}`);
    }

    getChlngRecByAssignerId(assignerId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8765/srvservice/chlngRecByassignerId/${assignerId}`);
    }

    deleteChallenge(challengeId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.delete(`http://localhost:8765/srvservice/challenge/${challengeId}`);
    }

    getQuestionsByChallengeId(challengeId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8765/srvservice/schQuesBychallengeId/${challengeId}`);
    }

    getQuestionsNotByChallengeId(assigneduid, challengeId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8765/srvservice/schQuesNotBychallengeId/${assigneduid}/${challengeId}`);
    }

    assignUpdateQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.put(`http://localhost:8765/srvservice/updateChallenge`, question);
    }

    createQuestionTemplate(questionTemplateData) {
        console.log('executed createQuestionTemplate : ', questionTemplateData)
        return axios.post(`http://localhost:8765/cctservice/add/questionTemplate`, questionTemplateData);
    }

    updateQuestionTemplate(questionTemplateData, templateId) {

        console.log('executed updateQuestionTemplate : ', questionTemplateData)
        return axios.put(`http://localhost:8765/cctservice//update/questionTemplate/${templateId}`, questionTemplateData);
    }

    getAllQuestionTemplates() {
        console.log('executed getAllQuestionTemplates : ')
        return axios.get(`http://localhost:8765/cctservice/getAllQuestionsTemplates`);

    }

    getAllQuestionsByTechDiffiExp(technology, difficulty, experience) {
        console.log('executed getAllQuestionsByTechDiffiExp : ', technology, difficulty, experience);
        return axios.get(`http://localhost:8765/cctservice/questions/${technology}/${difficulty}/${experience}`);

    }


    getAllQuestTempByTechDiffiExp(technology, difficulty, experience) {
        console.log('executed getAllQuestTempByTechDiffiExp : ', technology, difficulty, experience);
        return axios.get(`http://localhost:8765/cctservice/getFilteredTemplates/${technology}/${difficulty}/${experience}`);

    }

    assignQuestionsByTemplate(QuestionSchedulerData) {
        console.log('executed assignQuestionsByTemplate : ', QuestionSchedulerData)
        return axios.post(`http://localhost:8765/srvservice/assignTemplates`, QuestionSchedulerData);

    }

    deleteQuestionTemplate(questTemplateId) {
        console.log('executed service deleteQuestionTemplate templateId :', questTemplateId)
        return axios.delete(`http://localhost:8765/cctservice/delete/questionTemplate/${questTemplateId}`);
    }

    uploadSubjFile(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8082/uploadSubjFile`, question,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            });

    }
    uploadObjFile(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.post(`http://localhost:8082/uploadObjFile`, question,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            });

    }

}

export default new QuestionService()