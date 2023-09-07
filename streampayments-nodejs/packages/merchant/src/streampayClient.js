const axios = require('axios');

class StreamPayClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api-dev.streampayments.app'; // Replace with the actual StreamPay API URL
    }

    // Implement API methods here

    async getPayment(paymentId) {
        try {
            const response = await axios.get(`${this.baseURL}/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch payment: ${error.message}`);
        }
    }

    // Add more API methods as needed
}

module.exports = StreamPayClient;