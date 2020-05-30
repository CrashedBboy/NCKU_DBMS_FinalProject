$(document).ready(() => {

    listUsers();
});

$('form#button-form button[type=submit]').click((e) => {

    e.preventDefault();

    $.ajax({
        url: '/api/gui/register',
        method: 'POST',
        data: {
            account: checkValue($('#account').val()),
            nickname: checkValue($('#nickname').val()),
            password: checkValue($('#password').val()),
            signature: checkValue($('#signature').val())
        }
    })
    .done((res) => {

        console.log(res);

        if (res.result === true) {

            alertSuccess()
            document.getElementById('button-form').reset();
            listUsers();
        
        } else {

            alertFailure()
        } 
    });
});

$('form#sql-form button[type=submit]').click((e) => {

    e.preventDefault();

    $.ajax({
        url: '/api/sql/non-select',
        method: 'POST',
        data: {
            sql: $('#sql').text()
        }
    })
    .done((res) => {

        console.log(res);

        if (res.result === true) {

            alertSuccess()
            document.getElementById('sql-form').reset();
            listUsers();
        
        } else {

            alertFailure()
        } 
    });
});

// display all rows of user table
function listUsers() {
    getDBData().then((dbData) => {

        $('#user-rows').empty();

        dbData.users.forEach((user) => {

            $('#user-rows').append(
                `<tr>
                    <td>${user.id}</th>
                    <td>${user.account}</td>
                    <td>${user.nickname}</td>
                    <td>${user.password}</td>
                    <td>${user.sinature}</td>
                    <td>${user.login_count}</td>
                    <td>${user.created_at.substring(0, 10)}</td>
                </tr>`
            );
        });
    });
}

