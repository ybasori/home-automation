const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const app = express();

var middlewares = [
    
];
app.use(function(req, res, next){
    next();
});


var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// app.use(cors(corsOptions));
app.use(cors());


app.post('/upload',
    multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, "uploads/");
            },
            filename   : function (req, file, cb) {
                cb(null, file.originalname);
            },
            fileFilter: function(req, file, cb) {
                cb(null, true)
            }
        })
        
    }).any(),
    function (req, res, next) {
        return res.status(200).json(req.body);
})


app.get('/', function (req, res) {
    return res.send('Hello World')
})

app.listen(80)