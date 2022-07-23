import * as winston from 'winston';

const customFormat = winston.format((info) => {
    const date = new Date().toISOString();
    info.message = `[${date}] ${info.message}`
    return info;
})

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        customFormat(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console()
    ]
})

export default logger;