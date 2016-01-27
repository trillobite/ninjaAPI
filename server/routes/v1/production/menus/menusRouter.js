var express = require('express');
//var controller = require('./menusCtrl');
var controller = require('../../crudCtrl');
var tokenProtection = require('../../../../config/routeMiddleware');
var Menu = require('mongoose').model('Menu');

var router = express.Router();
router.use(tokenProtection);
///router.get('/', controller.getMenus);


router.use(tokenProtection);
router.get('/', function(req, res){
  controller.getModelItems(req, res, Menu);
});
router.get('/:id', function(req, res){
  controller.getModelItemById(req, res, Menu);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, Menu);
});
router.put('/:id', function(req, res){
  controller.updateModelItem(req, res, Menu);
});
router.post('/', function(req, res){
  controller.createModelItem(req, res, Menu);
});


module.exports = router;