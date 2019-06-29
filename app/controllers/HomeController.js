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
        // fs.readdir(storage, (err, files) => {
        //     return res.status(200).json(files);
        // });


        var glob = require("glob");

        glob(`${storage}/${req.params.code}*`, function (err, files) {
            // if(err){
            //     return res.status(400).json({
            //         msg: "something went wrong!"
            //     });
            // }
            // else{
            //     return res.status(200).json({
            //         msg: "successfully retrieved!",
            //         data: files
            //     });
            // }

            for(var i=0;i<files.length;i++){
                files[i]=files[i].replace(" /root/home-automation/","");
            }

            return res.render(`${Config.dir.view}/pages/recorded/index`, {
                glob: {
                    err   : err,
                    files : files
                }
            });
            
        })

    }
}