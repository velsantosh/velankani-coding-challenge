import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "https://vcti.com:8765/aaservice";
// var headers = {
//     'Content-Type': 'application/json',
//     }
class QuestionService {


    addQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8765/cctservice/subQuestion`, question, {
        return axios.post(`http://localhost:8082/subQuestion`, question, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${question._boundary}`,
            }
        });
    }

    addObjQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8765/cctservice/question`, question);
        return axios.post(`http://localhost:8082/question`, question);
    }

    updateUser(id, user) {
        //console.log('executed service')
        return axios.put(`${apiBaseUrl}/user/${id}`, user);
    }
    getQuestions() {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        // return axios.get(`http://vcti.com:8765/cctservice/questions`);
        return axios.get(`http://localhost:8082/questions`);
    }

    getQuestionsByType(type) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        //return axios.get(`http://vcti.com:8765/cctservice/questionsByType/${type}`);
        return axios.get(`http://localhost:8082/questionsByType/${type}`);
    }

    assignObjQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8083/bulkAssignUser`, question);
        return axios.post(`http://localhost:8083/bulkAssignUser`, question);
    }

    retrieveAllTechnology() {
        // return axios.get(`${apiBaseUrl}/technologies/`)
        // return axios.get(`http://vcti.com:8765/cctservice/technologies`)
        return axios.get(`http://localhost:8082/technologies`)
    }

    getQuestionsByTypeTech(type, tech) {
        //      return axios.get(`http://vcti.com:8765/cctservice/questions/type/${type}/tech/${tech}`,
        return axios.get(`http://localhost:8082/questions/type/${type}/tech/${tech}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'access-control-allow-origin': '*'
                },
                crossdomain: true
            }
        )
    }

    getAllSchQuestionsByUserId(userId) {
        console.log('executed service getAllSchQuestionsByUserId')
        // return axios.get(`${apiBaseUrl}/questions`);
        // return axios.get(`http://vcti.com:8765/srvservice/schQuesByUid/${userId}` );
        return axios.get(`http://localhost:8083/schQuesByUid/?userId=${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'access-control-allow-origin': '*'
                },
                crossdomain: true
            });

    }

    addSubjectiveQuestion(subjectiveQuestionData) {
        //  return axios.post('http://vcti.com:8765/cctservice/add/sub/question', subjectiveQuestionData);
        return axios.post('http://localhost:8082/add/sub/question', subjectiveQuestionData);
    }
    addObjectiveQuestion(objectiveQuestionData) {
        // return axios.post('http://vcti.com:8765/cctservice/add/obj/question', objectiveQuestionData);
        return axios.post('http://localhost:8082/add/obj/question', objectiveQuestionData);
    }
    modifySubjectiveQuestion(qId, questionData) {
        // return axios.put(`http://vcti.com:8765/cctservice/update/sub/question/${qId}`, questionData);
        return axios.put(`http://localhost:8082/update/sub/question/${qId}`, questionData);
    }
    modifyObjectiveQuestion(qId, questionData) {
        console.log("jst before calling api", questionData);
        //return axios.put(`http://vcti.com:8765/cctservice/update/obj/question/${qId}`, questionData);
        return axios.put(`http://localhost:8082/update/obj/question/${qId}`, questionData);
    }
    getQuestionsByTech(tech) {
        console.log('getQuestionsByTech------------', tech);
        //return axios.get(`http://vcti.com:8765/cctservice/questions/tech/${tech}`);
        return axios.get(`http://localhost:8082/questions/tech/${tech}`);
    }

    getQuestionsById(id) {
        //console.log('getQuestionsById')
        console.log('executed service getQuestionsById ', id)

        // return axios.get(`http://vcti.com:8765/cctservice/question/${id}`);
        return axios.get(`http://localhost:8082/question/${id}`);
    }

    getChlngRecByAssignerId(assignerId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        //return axios.get(`http://vcti.com:8765/srvservice/chlngRecByassignerId/${assignerId}`);
        return axios.get(`http://localhost:8083/chlngRecByassignerId/?assignerId=${assignerId}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'access-control-allow-origin': '*'
                },
                crossdomain: true
            });
    }

    deleteChallenge(challengeId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        // return axios.delete(`http://localhost:8083/challenge/${challengeId}`,
        return axios.delete(`http://localhost:8083/challenge/${challengeId}`);
    }

    getQuestionsByChallengeId(challengeId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8083/schQuesBychallengeId/${challengeId}`);
    }

    getQuestionsNotByChallengeId(assigneduid, challengeId) {
        //console.log('executed service')
        // return axios.get(`${apiBaseUrl}/questions`);
        return axios.get(`http://localhost:8083/schQuesNotBychallengeId/${assigneduid}/${challengeId}`);
    }

    assignUpdateQuestion(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        return axios.put(`http://localhost:8083/updateChallenge`, question);
    }

    createQuestionTemplate(questionTemplateData) {
        console.log('executed createQuestionTemplate : ', questionTemplateData)
        // return axios.post(`http://vcti.com:8765/cctservice/add/questionTemplate`, questionTemplateData);

        return axios.post(`http://localhost:8082/add/questionTemplate`, questionTemplateData);
    }

    updateQuestionTemplate(questionTemplateData, templateId) {

        console.log('executed updateQuestionTemplate : ', questionTemplateData)
        // return axios.put(`http://vcti.com:8765/cctservice/update/questionTemplate/${templateId}`, questionTemplateData);
        return axios.put(`http://localhost:8082/update/questionTemplate/${templateId}`, questionTemplateData);
    }

    getAllQuestionsDataByTemplateId(templateId) {
        console.log('executed getAllQuestionsDataByTemplateId : ')
        // return axios.get(`http://vcti.com:8765/cctservice/getAllQuestionsDataByTemplateId/${templateId}`, templateId);
        return axios.get(`http://localhost:8082/getAllQuestionsDataByTemplateId/${templateId}`, templateId);

    }

    getAllQuestionTemplates() {
        console.log('executed getAllQuestionTemplates : ')
        // return axios.get(`http://vcti.com:8765/cctservice/getAllQuestionsTemplates`);
        return axios.get(`http://localhost:8082/getAllQuestionsTemplates`);

    }

    getAllQuestionsByTechDiffiExp(technology, difficulty, experience) {
        console.log('executed getAllQuestionsByTechDiffiExp : ', technology, difficulty, experience);
        // return axios.get(`http://vcti.com:8765/cctservice/questions/${technology}/${difficulty}/${experience}`);
        return axios.get(`http://localhost:8082/questions/${technology}/${difficulty}/${experience}`);

    }

    getAllQuestTempByTechDiffiExp(technology, difficulty, experience) {
        console.log('executed getAllQuestTempByTechDiffiExp : ', technology, difficulty, experience);
        // return axios.get(`http://vcti.com:8765/cctservice/getFilteredTemplates/${technology}/${difficulty}/${experience}`);
        return axios.get(`http://localhost:8082/getFilteredTemplates/${technology}/${difficulty}/${experience}`);

    }

    assignQuestionsByTemplate(QuestionSchedulerData) {
        console.log('executed assignQuestionsByTemplate : ', QuestionSchedulerData)
        //return axios.post(`http://vcti.com:8083/assignTemplates`, QuestionSchedulerData);
        return axios.post(`http://localhost:8083/assignTemplates`, QuestionSchedulerData);

    }

    deleteQuestionTemplate(questTemplateId) {
        console.log('executed service deleteQuestionTemplate templateId :', questTemplateId)
        // return axios.delete(`http://vcti.com:8765/cctservice/delete/questionTemplate/${questTemplateId}`);
        return axios.delete(`http://localhost:8082/delete/questionTemplate/${questTemplateId}`);
    }

    uploadSubjFile(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8765/cctservice/uploadSubjFile`, question,
        return axios.post(`http://localhost:8082/uploadSubjFile`, question,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            });

    }
    uploadObjFile(question) {
        // return axios.get(`${apiBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8765/cctservice/uploadObjFile`, question,
        return axios.post(`http://localhost:8082/uploadObjFile`, question,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            });

    }

    deleteQuestiob(qId) {
        console.log('executed deleteQuestiob')
        // return axios.delete(`http://vcti.com:8765/cctservice/question/${qId}`);
        return axios.delete(`http://localhost:8082/question/${qId}`);
    }

}

export default new QuestionService()