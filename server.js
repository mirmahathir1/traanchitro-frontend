const express = require('express');
const app = express();

let PORT = process.env.PORT || 5000;

//CONFIGURATION TO SERVE VUEJS APP------START
const bodyParser=require('body-parser');
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

const path = require('path');
const history = require('connect-history-api-fallback');
const staticFileMiddleware = express.static(path.join(__dirname+'/dist'),{
    etag: false
});
app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);

//enable VUE_APP_API_KEY in heroku env
//CONFIGURATION TO SERVE VUEJS APP------END


app.get('/test',function (req, res) {
    console.log('token: ',req.header('TOKEN'));
    console.log('query: ',req.query);
    let hello={
        name: "Mahathir"
    };

    res.send(hello);//
});

app.post('/test2',function (req,res) {
    console.log(req.body);
    console.log(req.headers.token);

    res.send({name: "Mahathir"});
});

app.listen(PORT, function () {
    console.log( 'Express serving on http://localhost:',PORT );
});