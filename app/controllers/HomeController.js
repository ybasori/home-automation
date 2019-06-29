// MODULES
const fs = require('fs');

// EXTRAS
const Config = require(`../../configs/config.js`);
const mUpload = require(`../libraries/Multer.js`);


module.exports = {
    index: function (req, res) {

        return res.render(`${Config.dir.view}/pages/home/index`, {
            greetings: "hello"
        });

    },

    recorded: function(req, res){

        var storage = Config.dir.storage;
        fs.readdir(storage, (err, files) => {
            return res.status(200).json(files);
        });

    }
}