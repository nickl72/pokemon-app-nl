const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.players.index);
router.get('/login', ctrl.players.login);
router.get('/signup', ctrl.players.signup);
router.get('/profile/:index', ctrl.players.renderProfile);


router.post('/', ctrl.players.newProfile);
router.post('/profile', ctrl.players.profile);

router.put('/profile/:index', ctrl.players.editProfile);

router.delete('/:index', ctrl.players.deleteProfile);


module.exports = router;