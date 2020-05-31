$(document).ready(() => {

    listData();
});

$('form#button-form button[type=submit]').click((e) => {

    e.preventDefault();

    $.ajax({
        url: '/api/gui/non-board-user',
        method: 'POST',
        data: {
            board1: checkValue($('#board1').val()),
            board2: checkValue($('#board2').val())
        }
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

        $('#board-rows').empty();
        dbData.boards.forEach((board) => {

            $('#board-rows').append(
                `<tr>
                    <td>${board.id}</th>
                    <td>${board.title}</td>
                    <td>${board.description}</td>
                    <td>${board.greeting}</td>
                    <td>${board.manager}</td>
                    <td>${board.created_at.substring(0, 10)}</td>
                </tr>`
            );
        });

        $('#mapping-rows').empty();
        dbData.board_users.forEach((mapping) => {

            $('#mapping-rows').append(
                `<tr>
                    <td>${mapping.board_id}</th>
                    <td>${mapping.user_id}</td>
                    <td>${mapping.joined_at}</td>
                </tr>`
            );
        });
    });
}

