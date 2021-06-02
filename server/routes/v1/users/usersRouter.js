var express = require('express');
var router = express.Router();
var auth = require('../../../config/auth');
var controller = require('./usersCtrl');
var tokenProtection = require('../../../config/routeMiddleware');

router.get('/exists/:username', controller.userExists);

router.use(tokenProtection);
//router.get('/', auth.requiresRole('admin'), controller.getUsers);
// Base Route /api/users
//router.get('/', auth.isActivityAuthorized('GET /api/users'), controller.getUsers);

router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.post('/', auth.isActivityAuthorized('POST /api/users'), controller.createUser);
router.put('/:id', auth.isActivityAuthorized('PUT /api/users'), controller.updateUser);

module.exports = router;