// getDBData().then((data) => { console.log(data); });
function getDBData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/data',
            method: 'GET'
        })
        .done((data) => { resolve(data); })
        .fail((err) => { reject(err); });
    });
}