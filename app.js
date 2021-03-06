const fs             = require('fs');
const express        = require('express');
const app            = express();
const http           = require('http').createServer(app);
const io             = require('socket.io')(http);



const Config         = require(`${__dirname}/configs/config.js`);
const routes_web     = require(`${__dirname}/app/routes/web.js`)(express);
const routes_api     = require(`${__dirname}/app/routes/api.js`)(express);
const middleware     = require(`${__dirname}/app/middlewares/middleware.js`);


if (!fs.existsSync(`${Config.dir.storage}`)) fs.mkdirSync(`${Config.dir.storage}`);
if (!fs.existsSync(`${Config.dir.public}`)) fs.mkdirSync(`${Config.dir.public}`);



app.set('view engine', 'ejs');



app.use('/', express.static(__dirname + '/public'));
app.use('/storage', express.static(__dirname + '/storage'));



app.use('/', middleware.web, routes_web);
app.use('/api', middleware.api, routes_api);




const port           = Number(process.env.PORT || Config.port);
http.listen(port, function(){ console.log('listening on *:3000'); });



const devices    = [
    "-LhcedV_9_NOlNs9flKM"
];

const firebase   = require(`${__dirname}/app/libraries/Firebase.js`);
const fb_db      = firebase.database();
io.on('connection', function(socket){
    for(var i = 0; i<devices.length; i++){

        var device_id = devices[i];
        var ref = fb_db.ref("home/devices/"+device_id+"/current_cam");
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
            io.emit(device_id, snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }
    
});




