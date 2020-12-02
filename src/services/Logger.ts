import winston from'winston';
import fs from'fs';
import path from'path';
import ILogger from './ILogger';
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const options = {
  file: {
    level: 'info',
    filename: path.join(logDir, `/${Date.now()}-results.log`),
    // TODO check how winston handles excptions
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

class Logger implements ILogger {
    private winstonLogger;
    private debug;

    constructor() {
        this.winstonLogger = new winston.Logger({
            transports: [
              new winston.transports.File(options.file),
              // new(require('winston-daily-rotate-file'))(options.file),
              new winston.transports.Console(options.console),
            ],
            exitOnError: false, // do not exit on handled exceptions
          });

          this.debug = process && process.env && process.env.NODE_ENV === 'development';
    }

    public info(message: string): void {
        this.winstonLogger.info(message);
        if (this.debug) {
            this.winstonLogger.debug(message);
        }
    }

    public error(message: string): void {
        this.winstonLogger.error(message);
        if (this.debug) {
            this.winstonLogger.debug('error: ' + message);
        }
    }

    public warn(message: string): void {
        this.winstonLogger.info(message);
        if (this.debug) {
            this.winstonLogger.debug(message);
        }
    }
}

export default Logger;
