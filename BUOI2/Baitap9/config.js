require('dotenv').config();

// Export object config chứa các thông số hệ thống
module.exports = {
    processingDelay: parseInt(process.env.PROCESSING_DELAY_MS, 10) || 2000,
    logTimezone: process.env.LOG_TIMEZONE || 'UTC'
};