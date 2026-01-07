const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { verifyToken, authorize } = require('../middleware/authMiddleware');

router.post('/:id/register', verifyToken, registrationController.registerForEvent);
router.get('/organizer/events/:id/registrations', verifyToken, authorize(['organizer']), registrationController.getRegistrationsForOrganizer);

module.exports = router;