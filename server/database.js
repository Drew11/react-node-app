const sqlite3 = require('sqlite3').verbose();
const users = require("./initial-data/users");
const usersStatistic = require("./initial-data/users_statistic");
const db_source = "./server/database/db.sqlite";

function sql_insert (array, tableName) {

    let props = '';
    let values ='';
    for (let i = 0; i < Object.keys(array[0]).length; i++) {
        if(i ===  Object.keys(array[0]).length - 1) {
            values += `?`;
            props += `${Object.keys(array[0])[i]}`
        }else {
            values +=`?,`;
            props += `${Object.keys(array[0])[i]}, `;
        }
    }

    return`INSERT into ${tableName} (${props}) VALUES (${values});`;
}

const loadRowsInTable =(array, stmt) =>{
    for (let i = 0; i < array.length; i++) {
        stmt.run(Object.values(array[i]));
    }
    stmt.finalize();
};

const db = new sqlite3.Database(db_source);

db.serialize(function() {
    const sql_create_users =`CREATE TABLE IF NOT EXISTS users (
            id integer,
            first_name text,
            last_name text,
            email text UNIQUE,
            gender text,
            ip_address text,
            CONSTRAINT email_unique UNIQUE (email)
     );`;

    const sql_create_usersStatistic =`CREATE TABLE IF NOT EXISTS users_statistic (
            user_id integer,
            date text,
            page_views integer,
            clicks integer,
            FOREIGN KEY(user_id) REFERENCES user(id)
         );`;

    db.run(sql_create_users);
    db.run(sql_create_usersStatistic);

    const insertUsers = sql_insert(users, 'users');
    const insertUsersStatistic = sql_insert(usersStatistic, 'users_statistic');

    const stmtUsers = db.prepare(insertUsers);
    const stmtUsersStatistic = db.prepare(insertUsersStatistic);

    loadRowsInTable(users, stmtUsers);
    loadRowsInTable(usersStatistic, stmtUsersStatistic);

    db.each("SELECT * FROM users", function(err, row) {
        console.log(row);
    });

});
