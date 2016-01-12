var auth = require('./auth');
var companiesController = require('../routes/v1/companies/companiesCtrl');
var routesIndex = require('../routes/index');
var Company = require('mongoose').model('Company');


    

module.exports = function (app) {
    // defining routes on the passed in express app
    
    // handle the one api route that requires no authentication
    // This sets up CORS
    app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        next();
    });
    
    
    app.options('*', function(req,res,next){ res.send(200);});
    
    //simulate network latency!!!!
    //app.use(function(req,res,next){setTimeout(next,2000)});
    // 
    // app.post('/api/v1/companies', companiesController.createCompany);
    // app.post('/api/v1/createAccount', companiesController.createNewAccount);
    
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
    
    
    // app.post('/api/v1/login', auth.authenticate2);
    // app.post('/api/v1/logout', function(req, res){
    //     // I believe we need to destroy the token before sending success
    //     res.send({success: true});
    // });
    
    // app.post('/api/v1/companies/:id/verify', companiesController.verifyCompany);
    // app.post('/api/v1/companies/:id/runFirstPayment', companiesController.runFirstPayment);
    
    // on logout passport removes req.user so that it is undefined in the response thus manking front end "logged out"
    // app.post('/api/v1/logout', function (req, res) {
    //     req.logout();
    //     res.end();
    // });
    app.get('/api/v1/wakeup', function(req, res){
        Company.find({companyName: 'Old Town Dining, LLC'}).lean().exec(function (err, collection) {
            res.send({message: "I am awake!"});
        });
       
    });
    
    app.use('/api', routesIndex);
    
    app.all('/api/*', function (req, res) {
        res.sendStatus(404);
    });
    // bootstrappedUser gets added on page refreshes if the user is logged in otherwise it is undefined.
    app.get('*', function (req, res) {
        res.sendStatus(404);
    });

};