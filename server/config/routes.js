var auth = require('./auth');
var companiesController = require('../routes/v1/companies/companiesCtrl');
var routesIndex = require('../routes/index');


    

module.exports = function (app) {
    // defining routes on the passed in express app
    
    // handle the one api route that requires no authentication
    // This sets up CORS
    app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Methods', 'GET, PUT, POST, DELETE');
        next();
    });
    app.options('*', function(req,res,next){ res.send(200);});
    // 
    app.post('/api/v1/companies', companiesController.createCompany);
    app.post('/api/v1/createAccount', companiesController.createNewAccount);
    
    // lockout api without authenticated user.  passport puts a user object
    // on the req object...so if its not there there is no authenticated user
    // app.use('/api/*',function(req, res, next){
    //     next();
    //     // if ('user' in req){
    //     //     next();
    //     // }
    //     // else {
    //     //     res.sendStatus(403);
    //     // }
    // });
    
    
    app.post('/api/v1/login', auth.authenticate2);
    app.post('/api/v1/logout', function(req, res){
        // I believe we need to destroy the token before sending success
        res.send({success: true});
    });
    
    app.post('/api/v1/companies/:id/verify', companiesController.verifyCompany);
    app.post('/api/v1/companies/:id/runFirstPayment', companiesController.runFirstPayment);
    
    // on logout passport removes req.user so that it is undefined in the response thus manking front end "logged out"
    // app.post('/api/v1/logout', function (req, res) {
    //     req.logout();
    //     res.end();
    // });
    
    app.use('/api', routesIndex);
    
    app.all('/api/*', function (req, res) {
        res.sendStatus(404);
    });
    // bootstrappedUser gets added on page refreshes if the user is logged in otherwise it is undefined.
    app.get('*', function (req, res) {
        res.sendStatus(404);
    });

};