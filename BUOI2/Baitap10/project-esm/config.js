import dotenv from 'dotenv';
dotenv.config();

export default {
    processingDelay: parseInt(process.env.PROCESSING_DELAY_MS, 10) || 2000,
    logTimezone: process.env.LOG_TIMEZONE || 'UTC'
};