const { validateNumber } = require('../services/validateService');

const validateMobileNumber = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        const result = await validateNumber(mobileNumber);
        if (!result.valid) {
            return res.status(400).json({ message: result.message });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { validateMobileNumber };
