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

// relace user input with empty string if it is NULL or undefined
function checkValue(val) {

    if (val === undefined || val === null || val === "") {
        return '[empty]';
    }
    return val;
}

// show success alert
function alertSuccess() {
    $("#status-success").removeClass("d-none");
    $("#status-failure").addClass("d-none");
}

// show failure alert
function alertFailure() {
    $("#status-failure").removeClass("d-none");
    $("#status-success").addClass("d-none");
}