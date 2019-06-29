// MODULES

// EXTRAS
const mUpload = require(`../../libraries/Multer.js`);
const Helper = require(`../../libraries/Helper.js`);


module.exports = {
    upload: function(req,res){
        mUpload().any()(req, res, function(err){
            console.log(req.files)
            return res.status(200).json({
                msg: "successfully uploaded!"
            });
        });
    }
}