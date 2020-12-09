import React, { Component } from 'react';
import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'

var apiBaseUrl = "https://vcct.blr.velankani.com:8765/aaservice";
var aaServiceBaseUrl  = "https://vcct.blr.velankani.com:8081";
var cctServiceBaseUrl = "https://vcct.blr.velankani.com:8082";
var srvServiceBaseUrl = "https://vcct.blr.velankani.com:8083";

class ScheduledChallengeDataService {

    getScheduledQuestionByUserId(userId) {
        console.log('executed service getScheduledQuestionByUserId scheduled---')

        // return axios.get(`${srvServiceBaseUrl}/schQuesByUid/${userId}`,
        // return axios.get(`http://vcti.com:8765/srvservice/schQuesByUid/${userId}`,
        return axios.get(`${srvServiceBaseUrl}/schQuesByUid/?userId=${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                },
                crossdomain: true
            }
        );
    }

    submitScheduledQuestionResultsByUserId(objQuesResultSet) {

        console.log("submitScheduledQuestionResultsByUserId submitted : ", objQuesResultSet);
        //  return axios.post(`http://vcti.com:8765/srvservice/addObjResList`, objQuesResultSet ,{
        return axios.post(`${srvServiceBaseUrl}/addObjResList`, objQuesResultSet, {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            },
            crossdomain: true
        });
    }


    submitScheduledSubQuestionResultsByUserId(subQuesResultSet) {

        console.log("submitScheduledSubQuestionResultsByUserId submitted : ", subQuesResultSet);
        // return axios.post(`http://vcti.com:8765/srvservice/addSubjRes`, subQuesResultSet, {
        return axios.post(`${srvServiceBaseUrl}/addSubjRes`, subQuesResultSet, {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            },
            crossdomain: true
        });
    }


    submitScheduledSubQuestionResultsListByUserId(subQuesResultSet) {

        console.log("submitScheduledSubQuestionResultsListByUserId submitted : ", subQuesResultSet);
        // return axios.post(`http://vcti.com:8765/srvservice/addSubQResList`, subQuesResultSet,{
        return axios.post(`${srvServiceBaseUrl}/addSubQResList`, subQuesResultSet, {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            },
            crossdomain: true
        });
    }
    runScheduledQuestionTestCases(validateProgramContent) {

        console.log("runScheduledQuestionTestCases submitted : ", validateProgramContent);
        // return axios.post(`http://vcti.com:8765/srvservice/runSubjQuesTestCode`, validateProgramContent,{
        return axios.post(`${cctServiceBaseUrl}/runSubjQuesTestCode`, validateProgramContent, {
            headers: {
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            },
            crossdomain: true
        });
    }

    getScheduledQuestionByCandidateId(candidateId) {

        // return axios.get(`http://vcti.com:8765/srvservice/schQuesByCandidate/${candidateId}`,
        return axios.get(`${srvServiceBaseUrl}/schQuesByCandidate/?userId=${candidateId}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                },
                crossdomain: true
            }
        );
    }

    updateChallengeStatus(candidateId) {

        // return axios.get(`${apiBaseUrl}/updateChallengeStatus/${userId}`,
        //  return axios.put(`http://vcti.com:8765/srvservice/updateChallengeStatus/${candidateId}`,
        return axios.put(`${srvServiceBaseUrl}/updateChallengeStatus/?candidateId=${candidateId}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                },
                crossdomain: true
            }
        );
    }


    updateScheduleVideoStreamFlag(assigneduid, videoStreamFlag) {
        //console.log('executed service')
        // return axios.put(`http://vcti.com:8765/srvservice/update/scheduleddata/${assigneduid}/${videoStreamFlag}`,
        return axios.put(`${srvServiceBaseUrl}/update/scheduleddata/${assigneduid}/${videoStreamFlag}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                },
                crossdomain: true
            });
    }

    getAllVideoStreamingCandidateData(assigneruid) {
        //console.log('executed service')
        // return axios.get(`http://vcti.com:8765/srvservice/schedule/videostream/${assigneruid}`,
        return axios.get(`${srvServiceBaseUrl}/schedule/videostream/?userId=${assigneruid}`,
            {
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                },
                crossdomain: true
            });
    }
}

export default new ScheduledChallengeDataService()