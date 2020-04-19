const express = require('express');
const app = express();

//CONFIGURATION TO SERVE VUEJS APP------START
const bodyParser=require('body-parser');
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

const path = require('path');
const history = require('connect-history-api-fallback');
const staticFileMiddleware = express.static(path.join(__dirname+'/dist'));
app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);

//enable VUE_APP_API_KEY in heroku env
//CONFIGURATION TO SERVE VUEJS APP------END


app.get('/test',function (req, res) {
    console.log(req.body);
    console.log(req.header('token'));
    console.log(req.query.page);
    console.log(req.query.number);
    let hello={
        name: "Mahathir"
    };
    res.send(hello);//
});

app.listen(5000, function () {
    console.log( 'Express serving on http://localhost:5000' );
});