import winston from 'winston';
import { LogFormat, LogLevel, Loggable, MessageOptions } from './types';
import { jsonFormatter, plainFormatter } from './formatters';

type LoggingOptions = {
  format: LogFormat;
  level: LogLevel;
  stdout: boolean;
  file?: string;
};

class Logger<S extends string = string> implements Loggable<S> {
  protected logger: winston.Logger;

  constructor(options: LoggingOptions) {
    const {
      level = 'info',
      stdout = false,
      format = 'plain',
      file,
    } = options || {};

    const transports = [];

    if (stdout) {
      transports.push(new winston.transports.Console());
    }

    if (file) {
      transports.push(
        new winston.transports.File({
          filename: file,
        })
      );
    }

    this.logger = winston.createLogger({
      level,
      transports,
      format: format === 'json' ? jsonFormatter : plainFormatter,
    });
  }

  emerg(message: string, options?: MessageOptions<S>): void {
    this.logger.emerg(message, options);
  }

  alert(message: string, options?: MessageOptions<S>): void {
    this.logger.alert(message, options);
  }

  crit(message: string, options?: MessageOptions<S>): void {
    this.logger.crit(message, options);
  }

  err(message: string, options?: MessageOptions<S>): void {
    this.logger.error(message, options);
  }

  warning(message: string, options?: MessageOptions<S>): void {
    this.logger.warning(message, options);
  }

  notice(message: string, options?: MessageOptions<S>): void {
    this.logger.notice(message, options);
  }

  info(message: string, options?: MessageOptions<S>): void {
    this.logger.info(message, options);
  }

  debug(message: string, options?: MessageOptions<S>): void {
    this.logger.debug(message, options);
  }
}

export { LoggingOptions, Logger };
