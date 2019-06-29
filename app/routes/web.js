// MODULE

// EXTRAS
const Config = require(`../../configs/config.js`);

// CONTROLLERS
const Home = require(`${Config.dir.controller}/HomeController.js`);


module.exports = function(express){
    const app = express.Router();
    
    app.get('/', Home.index);
    app.get('/recorded/:code', Home.recorded);

    return app;
}