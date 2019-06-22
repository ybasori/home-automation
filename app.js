const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const fs = require('fs');
const app = express();

if (fs.existsSync("public/storage")) {
    fs.mkdirSync("public/storage");
}

app.use(function(req, res, next){
    next();
});


app.use(cors());

app.use('/', express.static('public'))

app.post('/upload',
    multer({
        storage: multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, "public/storage/");
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

    return res.send('Hello World');

})

app.get('/list', function(req, res){

    var testFolder = 'public/storage/';
    fs.readdir(testFolder, (err, files) => {
        return res.status(200).json(files);
    });

});

var port=Number(process.env.PORT || 3000)

app.listen(port, function(){
    console.log(`App start at port ${port}`);
})