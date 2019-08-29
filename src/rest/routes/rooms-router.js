var express = require('express');
var router = express.Router();
const controller = require('./../../controllers/rooms-controller');

router.post('/:roomId/messages/', controller.addMessage);

router.get('/:roomId/messages', controller.getMessages);

router.get('/:roomId/players', controller.getPlayers);

router.get('/', controller.getRooms);

router.post('/', controller.addRoom);

module.exports = router;