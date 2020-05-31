$(document).ready(() => {

    listUsers();
});

$('form#button-form button[type=submit]').click((e) => {

    e.preventDefault();

    $.ajax({
        url: '/api/gui/nickname',
        method: 'POST',
        data: {
            id: checkValue($('#user-id').val()),
            nickname: checkValue($('#nickname').val())
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
                    <td>${user.signature}</td>
                    <td>${user.login_count}</td>
                    <td>${user.created_at.substring(0, 10)}</td>
                </tr>`
            );
        });
    });
}
