/**
 * @param id
 * @returns {Element}
 */
function id(id) {
    return document.getElementById(id);
}

/**
 * @returns {string}
 */
function getToday() {
    var today = new Date();
    var dd = today.getDate();
    dd = dd < 10 ? '0' + dd : dd;
    var mm = today.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

document.addEventListener('DOMContentLoaded', function () {

    var date = getToday(),
        request = new XMLHttpRequest();

    request.open('GET', 'https://gununozeti.org/api?date=2017-08-17&format=json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            id('date').innerHTML = data.date;

            if (data.status == 'error') {
                id('error').style.display = 'block';
                id('error').innerHTML = '<span>&#128528;</span>' + data.message;
            } else {
                var list = '';
                for (var key in data.summaries) {
                    var summary = data.summaries[key];
                    list += '<li><a href="' + summary.url + '" target="_blank">' + summary.title + '</a></li>';
                }
                id('list').style.display = 'block';
                id('list').innerHTML = list;
                if (data.notice != '') {
                    id('notice').style.display = 'block';
                    id('notice').innerHTML = data.notice.replace("\n", "<br>");
                }
            }

        }
    };

    request.onerror = function () {
        id('error').style.display = 'block';
        id('error').innerHTML = 'Bir sorun oluştu ve veriler çekilemedi!';
    };

    request.send();

});