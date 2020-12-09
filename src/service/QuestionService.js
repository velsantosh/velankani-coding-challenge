import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "https://vcct.blr.velankani.com:8765/aaservice";
var aaServiceBaseUrl = "https://vcct.blr.velankani.com:8081";
var cctServiceBaseUrl = "https://vcct.blr.velankani.com:8082";
var srvServiceBaseUrl= "https://vcct.blr.velankani.com:8083";

class QuestionService {


    addQuestion(question) {
        // return axios.get(`${cctServiceBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8765/cctservice/subQuestion`, question, {
        return axios.post(`${cctServiceBaseUrl}/subQuestion`, question, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${question._boundary}`,
            }
        });
    }

    addObjQuestion(question) {
        // return axios.get(`${aaServiceBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8765/cctservice/question`, question);
        return axios.post(`${cctServiceBaseUrl}/question`, question);
    }

    updateUser(id, user) {
        //console.log('executed service')
        return axios.put(`${aaServiceBaseUrl}/user/${id}`, user);
    }
    getQuestions() {
        //console.log('executed service')
        // return axios.get(`${aaServiceBaseUrl}/questions`);
        // return axios.get(`http://vcti.com:8765/cctservice/questions`);
        return axios.get(`${cctServiceBaseUrl}/questions`);
    }

    getQuestionsByType(type) {
        //console.log('executed service')
        // return axios.get(`${aaServiceBaseUrl}/questions`);
        //return axios.get(`http://vcti.com:8765/cctservice/questionsByType/${type}`);
        return axios.get(`${cctServiceBaseUrl}/questionsByType/${type}`);
    }

    assignObjQuestion(question) {
        // return axios.get(`${aaServiceBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8083/bulkAssignUser`, question);
        return axios.post(`${srvServiceBaseUrl}/bulkAssignUser`, question);
    }

    retrieveAllTechnology() {
        // return axios.get(`${aaServiceBaseUrl}/technologies/`)
        // return axios.get(`http://vcti.com:8765/cctservice/technologies`)
        return axios.get(`${cctServiceBaseUrl}/technologies`)
    }

    getQuestionsByTypeTech(type, tech) {
        // return axios.get(`http://vcti.com:8765/cctservice/questions/type/${type}/tech/${tech}`,
        return axios.get(`${cctServiceBaseUrl}/questions/type/${type}/tech/${tech}`,
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
        // return axios.get(`${aaServiceBaseUrl}/questions`);
        // return axios.get(`http://vcti.com:8765/srvservice/schQuesByUid/${userId}` );
        return axios.get(`${srvServiceBaseUrl}/schQuesByUid/?userId=${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'access-control-allow-origin': '*'
                },
                crossdomain: true
            });

    }

    addSubjectiveQuestion(subjectiveQuestionData) {
        //  return axios.post('http://vcti.com:8765/cctservice/add/sub/question', subjectiveQuestionData);
        return axios.post('${cctServiceBaseUrl}/add/sub/question', subjectiveQuestionData);
    }
    addObjectiveQuestion(objectiveQuestionData) {
        // return axios.post('http://vcti.com:8765/cctservice/add/obj/question', objectiveQuestionData);
        return axios.post('${cctServiceBaseUrl}/add/obj/question', objectiveQuestionData);
    }
    modifySubjectiveQuestion(qId, questionData) {
        // return axios.put(`http://vcti.com:8765/cctservice/update/sub/question/${qId}`, questionData);
        return axios.put(`${cctServiceBaseUrl}/update/sub/question/${qId}`, questionData);
    }
    modifyObjectiveQuestion(qId, questionData) {
        console.log("jst before calling api", questionData);
        //return axios.put(`http://vcti.com:8765/cctservice/update/obj/question/${qId}`, questionData);
        return axios.put(`${cctServiceBaseUrl}/update/obj/question/${qId}`, questionData);
    }
    getQuestionsByTech(tech) {
        console.log('getQuestionsByTech------------', tech);
        //return axios.get(`http://vcti.com:8765/cctservice/questions/tech/${tech}`);
        return axios.get(`${cctServiceBaseUrl}/questions/tech/${tech}`);
    }

    getQuestionsById(id) {
        //console.log('getQuestionsById')
        console.log('executed service getQuestionsById ', id)

        // return axios.get(`http://vcti.com:8765/cctservice/question/${id}`);
        return axios.get(`${cctServiceBaseUrl}/question/${id}`);
    }

    getChlngRecByAssignerId(assignerId) {
        //console.log('executed service')
        // return axios.get(`${aaServiceBaseUrl}/questions`);
        //return axios.get(`http://vcti.com:8765/srvservice/chlngRecByassignerId/${assignerId}`);
        return axios.get(`${srvServiceBaseUrl}/chlngRecByassignerId/?assignerId=${assignerId}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'access-control-allow-origin': '*'
                },
                crossdomain: true
            });
    }

    deleteChallenge(challengeId) {
        //console.log('executed service')
        // return axios.get(`${aaServiceBaseUrl}/questions`);
        // return axios.delete(`${srvServiceBaseUrl}/challenge/${challengeId}`,
        return axios.delete(`${srvServiceBaseUrl}/challenge/${challengeId}`);
    }

    getQuestionsByChallengeId(challengeId) {
        //console.log('executed service')
        // return axios.get(`${aaServiceBaseUrl}/questions`);
        return axios.get(`${srvServiceBaseUrl}/schQuesBychallengeId/${challengeId}`);
    }

    getQuestionsNotByChallengeId(assigneduid, challengeId) {
        //console.log('executed service')
        // return axios.get(`${aaServiceBaseUrl}/questions`);
        return axios.get(`${srvServiceBaseUrl}/schQuesNotBychallengeId/${assigneduid}/${challengeId}`);
    }

    assignUpdateQuestion(question) {
        // return axios.get(`${aaServiceBaseUrl}/question`,question);
        return axios.put(`${srvServiceBaseUrl}/updateChallenge`, question);
    }

    createQuestionTemplate(questionTemplateData) {
        console.log('executed createQuestionTemplate : ', questionTemplateData)
        // return axios.post(`http://vcti.com:8765/cctservice/add/questionTemplate`, questionTemplateData);

        return axios.post(`${cctServiceBaseUrl}/add/questionTemplate`, questionTemplateData);
    }

    updateQuestionTemplate(questionTemplateData, templateId) {

        console.log('executed updateQuestionTemplate : ', questionTemplateData)
        // return axios.put(`http://vcti.com:8765/cctservice/update/questionTemplate/${templateId}`, questionTemplateData);
        return axios.put(`${cctServiceBaseUrl}/update/questionTemplate/${templateId}`, questionTemplateData);
    }

    getAllQuestionsDataByTemplateId(templateId) {
        console.log('executed getAllQuestionsDataByTemplateId : ')
        // return axios.get(`http://vcti.com:8765/cctservice/getAllQuestionsDataByTemplateId/${templateId}`, templateId);
        return axios.get(`${cctServiceBaseUrl}/getAllQuestionsDataByTemplateId/${templateId}`, templateId);

    }

    getAllQuestionTemplates() {
        console.log('executed getAllQuestionTemplates : ')
        // return axios.get(`http://vcti.com:8765/cctservice/getAllQuestionsTemplates`);
        return axios.get(`${cctServiceBaseUrl}/getAllQuestionsTemplates`);

    }

    getAllQuestionsByTechDiffiExp(technology, difficulty, experience) {
        console.log('executed getAllQuestionsByTechDiffiExp : ', technology, difficulty, experience);
        // return axios.get(`http://vcti.com:8765/cctservice/questions/${technology}/${difficulty}/${experience}`);
        return axios.get(`${cctServiceBaseUrl}/questions/${technology}/${difficulty}/${experience}`);

    }

    getAllQuestTempByTechDiffiExp(technology, difficulty, experience) {
        console.log('executed getAllQuestTempByTechDiffiExp : ', technology, difficulty, experience);
        // return axios.get(`http://vcti.com:8765/cctservice/getFilteredTemplates/${technology}/${difficulty}/${experience}`);
        return axios.get(`${cctServiceBaseUrl}/getFilteredTemplates/${technology}/${difficulty}/${experience}`);

    }

    assignQuestionsByTemplate(QuestionSchedulerData) {
        console.log('executed assignQuestionsByTemplate : ', QuestionSchedulerData)
        //return axios.post(`http://vcti.com:8083/assignTemplates`, QuestionSchedulerData);
        return axios.post(`${srvServiceBaseUrl}/assignTemplates`, QuestionSchedulerData);

    }

    deleteQuestionTemplate(questTemplateId) {
        console.log('executed service deleteQuestionTemplate templateId :', questTemplateId)
        // return axios.delete(`http://vcti.com:8765/cctservice/delete/questionTemplate/${questTemplateId}`);
        return axios.delete(`${cctServiceBaseUrl}/delete/questionTemplate/${questTemplateId}`);
    }

    uploadSubjFile(question) {
        // return axios.get(`${aaServiceBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8765/cctservice/uploadSubjFile`, question,
        return axios.post(`${cctServiceBaseUrl}/uploadSubjFile`, question,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            });

    }
    uploadObjFile(question) {
        // return axios.get(`${aaServiceBaseUrl}/question`,question);
        // return axios.post(`http://vcti.com:8765/cctservice/uploadObjFile`, question,
        return axios.post(`${cctServiceBaseUrl}/uploadObjFile`, question,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
            });

    }

    deleteQuestiob(qId) {
        console.log('executed deleteQuestiob')
        // return axios.delete(`http://vcti.com:8765/cctservice/question/${qId}`);
        return axios.delete(`${cctServiceBaseUrl}/question/${qId}`);
    }

}

export default new QuestionService()