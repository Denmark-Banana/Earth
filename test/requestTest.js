const request = require('request');
const url = 'https://192.168.7.198:8030/ui';


function login() {
    const options = {
        uri: url + '/auths/login',
        method: 'POST',
        form: {
            id: 'systemadmin',
            password: '94bxtPR17-'
        },
        rejectUnauthorized : false
    }
    request.post(options, function(error, response, body) {
        if(error) 
            console.log(error);
        //console.log(response);
        else {
            const bodyObject = JSON.parse(body);
            const token = bodyObject.access_token;
            console.log('login Success.');
            console.log('token: ' + token);
            getLatest(token);
        }

    });
}
function getLatest (token) {
    const latestOption = {
        headers: {
            authzserviceid: 'Ship',
            authorization: token
        },
        uri: url + '/devices/telemetry/getLatest?',
        method: 'GET',
        qs: {
            serviceId: 'Ship',
            deviceId: 'LBTS',
            sensorNodeId: 'PRS.PV',
            //sensorNodeId: 'FGS.PV',
            authorization: 'bearer ' + token
        },  
        rejectUnauthorized : false
    };
    request.get(latestOption, function(error, response, body) {
        const bodyObject = JSON.parse(body);
        if(bodyObject.error)
            console.log(bodyObject.error);
        else {
            console.log(bodyObject);
            console.log(bodyObject.rows.sensorNodes);
        }
    });
}
//login();