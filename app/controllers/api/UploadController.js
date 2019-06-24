// MODULES

// EXTRAS
const mUpload = require(`../../libraries/Multer.js`);


module.exports = {
    upload: function(req,res){
        mUpload().any()(req, res, function(err){
            return res.status(200).json(req.body);
        });
    }
}