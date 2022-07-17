import * as winston from 'winston';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp()
    ),
    transports: [
        new winston.transports.Console()
    ]
})

export default logger;