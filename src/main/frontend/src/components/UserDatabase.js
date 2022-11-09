
const express = require('express');
const db = require('mysql');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const mysql = db.createConnection({
    host: "localhost",
    user: "root",
    password: "Ltt21400!",
    database: "imageupload"
})

app.listen(3001, () => {
    console.log("Database is running");
});

app.post('/SignUp', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    mysql.query(
        "INSERT INTO users (email, pwd) VALUES (?,?)",
        [email, password],
        (err, result) => {
            res.send({error: err});
        }
    )
});

app.post('/SignIn', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    mysql.query(
        "SELECT * FROM users WHERE email=? AND pwd=?",
        [email, password],

        (error, result) => {

            try {
                if (result) {
                    res.send(result);
                }
                else {
                    res.send({message: "Wrong email or password!"});
                }
            } catch (error) {
                res.send({err: error});
            }
        }

    )

    
});