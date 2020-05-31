$(document).ready(() => {

    listData();
});

$('form#button-form button[type=submit]').click((e) => {

    e.preventDefault();

    $.ajax({
        url: '/api/gui/board-info',
        method: 'POST',
        data: {
            board: checkValue($('#boardid').val())
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

// display rows returned from SELECT SQLs
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
        $("#result-rows").empty();
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

        $('#board-rows').empty();

        dbData.boards.forEach((board) => {

            $('#board-rows').append(
                `<tr>
                    <td>${board.id}</th>
                    <td>${board.title}</td>
                    <td>${board.description}</td>
                    <td>${board.greeting}</td>
                    <td>${board.manager}</td>
                    <td>${board.created_at}</td>
                </tr>`
            );
        });

        $('#article-rows').empty();
        dbData.articles.forEach((article) => {

            $('#article-rows').append(
                `<tr>
                    <td>${article.id}</th>
                    <td>${article.author}</th>
                    <td>${article.title}</th>
                    <td>${article.context}</th>
                    <td>${article.board}</th>
                    <td>${article.created_at.substring(0, 10)}</th>
                </tr>`
            );
        });
    });
}

