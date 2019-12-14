const baseUrl = 'http://localhost:8000/api/v1/';
function rateUp(id) {
    let request = makeRequest('commit/' + id + '/like_up', 'post', false);
    request.done(function(data, status, response) {
        console.log('Rated up quote with id ' + id + '.');
        $('#rating_' + id).text(data.rating);
    }).fail(function(response, status, message) {
        console.log('Could not rate up quote with id ' + id + '.');
        console.log(response.responseText);
    });
}

function rateDown(id) {
    let request = makeRequest('image/' + id + '/like_down', 'post', false);
    request.done(function(data, status, response) {
        console.log('Rated up quote with id ' + id + '.');
        $('#rating_' + id).text(data.rating);
    }).fail(function(response, status, message) {
        console.log('Could not rate up quote with id ' + id + '.');
        console.log(response.responseText);
    });
}

function getQuotes() {
    let request = makeRequest('commit', 'get', false);
    request.done(function(data, status, response) {
        console.log(data);
        data.forEach(function(item, index, array) {
            content.append($(`<div class="card" id="quote_${item.id}">
                <p>${item.text}</p>
                <p id="rating_${item.id}">${item.like}</p>
                <p><a href="#" class="btn btn-success" id="rate_up_${item.id}">+</a></p>
                <p><a href="#" class="btn btn-danger" id="rate_down_${item.id}">-</a></p>
            </div>`));
            $('#like_up_' + item.id).on('click', function(event) {
                console.log('click');
                event.preventDefault();
                rateUp(item.id);
            });
                $('#like_down_' + item.id).on('click', function(event) {
                console.log('click');
                event.preventDefault();
                rateDown(item.id);
            });
        });
    }).fail(function(response, status, message) {
        console.log('Could not get quotes.');
        console.log(response.responseText);
    });
}

$(document).ready(function() {
    getQuotes();
});

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