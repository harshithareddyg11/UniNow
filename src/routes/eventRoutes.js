const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken, authorize } = require('../middleware/authMiddleware');

router.post('/', verifyToken, authorize(['organizer']), eventController.createEvent);
router.get('/', verifyToken, eventController.getAllEvents);
router.get('/:id', verifyToken, eventController.getEventById);

module.exports = router;