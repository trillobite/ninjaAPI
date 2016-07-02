var express = require('express');
var controller = require('../crudCtrl');
var Customer = require('mongoose').model('Customer');
var tokenProtection = require('../../../config/routeMiddleware');



 //http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);
router.get('/', function(req, res){
    // var population = {
    //     path: 'contracts',
    //     select: 'title eventDate'
    // };
    var population = {'contracts': {'select':'title eventDate'}};
    req.query.populate = population;
    controller.getModelItems(req, res, Customer);
});
router.get('/:id', function(req, res){
  //var population = ['contacts', 'title'];
  var population = {'contracts': {'select':'title eventDate'}};
  req.query.populate = population;
  
  controller.getModelItems(req, res, Customer);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, Customer);
});
router.put('/:id', function(req, res){
    // after update we must repopulate the object
    var population = {
        path: 'contracts',
        select: 'title eventDate'
    };
    controller.updateModelItem(req, res, Customer, population);
});
router.post('/', function(req, res){
  controller.createModelItem(req, res, Customer);
});


module.exports = router;