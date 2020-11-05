import axios from 'axios'
//const INSTRUCTOR = 'in28minutes'
var apiBaseUrl = "http://192.168.1.103:8083";

class ScheduledRequestService {

    getAllScheduledRequests() {
        // return axios.get(`http://vcti.com:8765/srvservice/schedule/request`,
        return axios.get(`http://vcct.blr.velankani.com:8083/schedule/request`,
            {
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
                },
                crossdomain: true
            }
        );
    }

}

export default new ScheduledRequestService();