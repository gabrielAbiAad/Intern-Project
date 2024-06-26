const express = require('express');
const { validateMobileNumber } = require('../controllers/validateController');

const router = express.Router();

router.post('/validate', validateMobileNumber);

module.exports = router;
