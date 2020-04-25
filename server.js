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
    //console.log('token: ',req.header('TOKEN'));
    //console.log('query: ',req.query);
    let hello={
        name: "Mahathir"
    };

    res.send(hello);//
});

app.post('/test2',function (req,res) {
    console.log(req.body);

    res.append('TOKEN', '123654789');
    res.send({name: "Mahathir"});
});

app.listen(5000, function () {
    console.log( 'Express serving on http://localhost:5000' );
});