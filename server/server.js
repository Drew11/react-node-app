const express = require("express");
const app = express();
const db_source = "./server/database/db.sqlite";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(db_source);
const bodyParser = require("body-parser");
const HTTP_PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();

});


// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/users", async (req, res, next) => {
    const currentPage = Number(req.query['current_page']);
    const usersOnPage = Number(req.query['users_on_page']);
    const offset = usersOnPage * (currentPage - 1);
    const sql = `select 
    users.id,
    users.first_name,                                                                        
    users.last_name, 
    users.email,
    users.gender,
    users.ip_address, 
    sum(users_statistic.clicks) as total_clicks,
    sum(users_statistic.page_views) as total_views
    from users join users_statistic on users.id = users_statistic.user_id group by id
    LIMIT ${usersOnPage} OFFSET ${offset}
    ;`;

        db.all(sql, (err, rows)=>{
            if (err) {
                res.status(400).json({"error":err.message});
            }
            db.get(`select count(*) as length from users`, (err, data)=>{
                if (err) {
                    res.status(400).json({"error":err.message});
                }
                res.json({
                    "message": "success",
                    "users" : rows,
                    "length": data.length
                })
            });
        });

});

app.get("/api/statistic/:id", (req, res, next) => {

    const id = req.params.id;
    const sql = `SELECT
	    *
    FROM
	    users_statistic
	WHERE users_statistic.user_id = ?
    `;
    const params = [id];

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;

        }
        res.json({
            "message":"success",
            "user_statistic": rows,
        })
    });
});

//
// app.get("/api/user/:user", (req, res, next) => {

//     var params = [req.params.user]

// });
//
//
// app.post("/api/user/", (req, res, next) => {
//     var errors=[]
//     if (!req.body.password){
//         errors.push("No password specified");
//     }
//     if (!req.body.email){
//         errors.push("No email specified");
//     }
//     if (errors.length){
//         res.status(400).json({"error":errors.join(",")});
//         return;
//     }
//     var data = {
//         name: req.body.name,
//         email: req.body.email,
//         password : md5(req.body.password)
//     }
//     var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
//     var params =[data.name, data.email, data.password]
//     db.run(sql, params, function (err, result) {
//         if (err){
//             res.status(400).json({"error": err.message})
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": data,
//             "user" : this.lastID
//         })
//     });
// })
//
//
//
// var data = {
//     name: req.body.name,
//     email: req.body.email,
//     password : req.body.password ? md5(req.body.password) : undefined
// }

app.patch("/api/users/:id", (req, res, next) => {
    const inputData = [
        req.body.email,
        req.params.id
    ];
    console.log(inputData)

    db.run(`UPDATE users SET ip_address = ? WHERE users.id = ? ;`,
        inputData
        , (err, result) => {
            if (err){
                console.log(err)
                res.status(400).json({"error": res.message})
                return;
            }
            console.log(result)
            res.json({
                message: "success",
                data: result
            })
        });


    // console.log(typeof newValue)
    // db.run(sql,(err, data)=>{
    //     if (err) {
    //         res.status(400).json({"error":err.message});
    //     }
    //     console.log(data)
    //     res.json({
    //         "message": "success",
    //         "users" : data,
    //     })
    // });


    // db.run(sql,
    //     [data.email, req.params.user],
    //     (err, result) => {
    //         if (err){
    //             res.status(400).json({"error": res.message})
    //             return;
    //         }
    //         res.json({
    //             message: "success",
    //             data: data
    //         })
    //     });

})
//
//
// app.delete("/api/user/:user", (req, res, next) => {
//     db.run(
//         'DELETE FROM user WHERE user = ?',
//         req.params.user,
//         function (err, result) {
//             if (err){
//                 res.status(400).json({"error": res.message})
//                 return;
//             }
//             res.json({"message":"deleted", rows: this.changes})
//         });
// })


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});