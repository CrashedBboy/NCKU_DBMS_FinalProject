$(document).ready(() => {

    listData();
});

$('form#button-form button[type=submit]').click((e) => {

    e.preventDefault();

    $.ajax({
        url: '/api/gui/login-statistic',
        method: 'POST',
        data: {}
    })
    .done((res) => {

        console.log(res);

        if (res.result === true) {

            alertSuccess();
            document.getElementById('button-form').reset();

            listResult(res.rows);
        
        } else {

            alertFailure();
        } 
    });
});

$('form#sql-form button[type=submit]').click((e) => {

    e.preventDefault();

    $.ajax({
        url: '/api/sql/select',
        method: 'POST',
        data: {
            sql: $('#sql').text()
        }
    })
    .done((res) => {

        console.log(res);

        if (res.result === true) {

            alertSuccess();
            document.getElementById('sql-form').reset();
            
            listResult(res.rows);
            listData();
        
        } else {

            alertFailure();
        } 
    });
});

function listResult(rows) {

    $("#result-rows").empty();

    if (rows.length > 0) {

        // display table header
        let columnNames = Object.keys(rows[0]);
        $("#result-headers").empty();
        columnNames.forEach((name) => {
            $("#result-headers").append(`<th scope="col">${name}</th>`);
        });

        // display table rows
        rows.forEach((row) => {

            let gridString = "";
            columnNames.forEach((name) => {
                gridString += `<td>${row[name]}</td>`;
            });

            $("#result-rows").append(`<tr>${gridString}</tr>`);
        });
    }
}

// display rows of DB tables
function listData() {
    getDBData().then((dbData) => {

        $('#user-rows').empty();

        dbData.users.forEach((user) => {

            $('#user-rows').append(
                `<tr>
                    <td>${user.id}</th>
                    <td>${user.account}</td>
                    <td>${user.nickname}</td>
                    <td>${user.password}</td>
                    <td>${user.signature}</td>
                    <td>${user.login_count}</td>
                    <td>${user.created_at.substring(0, 10)}</td>
                </tr>`
            );
        });
    });
}

