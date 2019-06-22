const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const fs = require('fs');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const serviceAccount = require("./secret/yusuf-9c0ce-firebase-adminsdk-xplsl-2a746630c9.json");
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://yusuf-9c0ce.firebaseio.com",
    storageBucket: "yusuf-9c0ce.appspot.com"
});

const db = admin.database();
io.on('connection', function(socket){
    var device_id = "-LhcedV_9_NOlNs9flKM";
    var ref = db.ref("home/devices/"+device_id+"/current_cam");
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        io.emit(device_id, snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});


if (!fs.existsSync("public/storage")) {
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

http.listen(port, function(){
    console.log('listening on *:3000');
});