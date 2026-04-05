const express = require('express');
const router = express.Router();
const { createRequirement, getRequirements } = require('../controllers/requirementController');

router.route('/').post(createRequirement).get(getRequirements);

module.exports = router;
