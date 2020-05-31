$(document).ready(() => {

    listData();
});

$('form#button-form button[type=submit]').click((e) => {

    e.preventDefault();

    $.ajax({
        url: '/api/gui/delete-inactive-user',
        method: 'POST',
        data: {
            user: checkValue($('#userid').val()),
        }
    })
    .done((res) => {

        console.log(res);

        if (res.result === true) {

            alertSuccess()
            document.getElementById('button-form').reset();
            listData();
        
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
            listData();
        
        } else {

            alertFailure()
        } 
    });
});

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

        $('#comment-rows').empty();
        dbData.comments.forEach((comment) => {

            $('#comment-rows').append(
                `<tr>
                    <td>${comment.id}</th>
                    <td>${comment.author}</th>
                    <td>${comment.article}</th>
                    <td>${comment.context}</th>
                    <td>${comment.type}</th>
                    <td>${comment.created_at.substring(0, 10)}</th>
                </tr>`
            );
        });
    });
}