const request = require('request');
const url = 'https://192.168.7.77:8030/ui';


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
        uri: url + '/devices/telemetry/getLatest?',
        method: 'GET',
        qs: {
            serviceId: 'ship',
            deviceId: 'HVAC',
            sensorNodeId: '*',
            authorization: 'bearer ' + token
        },
        rejectUnauthorized : false
    };
    request.get(latestOption, function(error, response, body) {
        if(error) 
            console.log(error);
        else {
            const bodyObject = JSON.parse(body);
            console.log(bodyObject);
        }    
    });
}
login();