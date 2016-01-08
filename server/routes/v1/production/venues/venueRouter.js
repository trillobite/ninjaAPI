var express = require('express');
var controller = require('./venueCtrl');
var tokenProtection = require('../../../../config/routeMiddleware');




var router = express.Router();



router.use(tokenProtection);
router.get('/', controller.getVenues);
router.get('/:id', controller.getVenueById);
router.delete('/:id', controller.deleteVenue);
router.put('/:id', controller.updateVenue);
router.post('/', controller.createVenue);


module.exports = router;