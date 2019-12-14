console.log('tets')

const baseUrl = 'http://localhost:8000/api/v1/';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

console.log(csrftoken);
console.log('yes')
function rateUp(id) {
    let request = makeRequest('commit/' + id + '/like_up', 'post', true);
    request.done(function(data, status, response) {
        console.log('Rated up quote with id ' + id + '.');
        $('#like_' + id).text(data.like);
    }).fail(function(response, status, message) {
        console.log('Could not rate up quote with id ' + id + '.');
        console.log(response.responseText);
    });
}

function rateDown(id) {
    let request = makeRequest('commit/' + id + '/like_down', 'post', true);
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
        settings.headers = {"X-CSRFToken": getCookie('csrftoken')};
    }
    return $.ajax(settings);
}

function getFullPath(path) {
    path = path.replace(/^\/+|\/+$/g, '');
    path = path.replace(/\/{2,}/g, '/');
    return baseUrl + path + '/';
}
