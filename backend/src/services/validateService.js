const axios = require('axios');

const validateNumber = async (mobileNumber) => {
    const apiKey = 'a1b22d4dc4026faff89f0ef5d63573c3'; // Replace with your actual API key
    const url = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${mobileNumber}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (!data.valid) {
            return { valid: false, message: 'Invalid number' };
        }

        return {
            valid: true,
            countryCode: data.country_code,
            countryName: data.country_name,
            operatorName: data.carrier
        };
    } catch (error) {
        throw new Error('Error validating number');
    }
};

module.exports = { validateNumber };
