const baseUrl = 'http://localhost:8000/api/v1/';
function rateUp(id) {
    let request = makeRequest('commit/' + id + '/like_up', 'post', false);
    request.done(function(data, status, response) {
        console.log('Rated up quote with id ' + id + '.');
        $('#like_' + id).text(data.like);
    }).fail(function(response, status, message) {
        console.log('Could not rate up quote with id ' + id + '.');
        console.log(response.responseText);
    });
}

function rateDown(id) {
    let request = makeRequest('image/' + id + '/like_down', 'post', false);
    request.done(function(data, status, response) {
        console.log('Rated up quote with id ' + id + '.');
        $('#like_' + id).text(data.like);
    }).fail(function(response, status, message) {
        console.log('Could not rate up quote with id ' + id + '.');
        console.log(response.responseText);
    });
}

function makeRequest(path, method, auth=true, data=null) {
    let settings = {
        url: getFullPath(path),
        method: method,
        dataType: 'json'
    };
    if (data) {
        settings['data'] = JSON.stringify(data);
        settings['contentType'] = 'application/json';
    }
    if (auth) {
        settings.headers = {'Authorization': 'Token ' + getToken()};
    }
    return $.ajax(settings);
}

function getFullPath(path) {
    path = path.replace(/^\/+|\/+$/g, '');
    path = path.replace(/\/{2,}/g, '/');
    return baseUrl + path + '/';
}