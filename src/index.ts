import { Logger } from './logger';
import { LogFormat, LogFormats, LogLevel, LogLevels } from './types';
import { NullLogger } from './null-logger';
import { Loggable } from './types';

type CreateOptions = {
  level?: string;
  format?: string;
  filePath?: string;
  stdout?: boolean;
};

const createLogger = <S extends string = string>(
  options: CreateOptions
): Logger<S> => {
  const { filePath, stdout = false } = options;

  const level = LogLevels.includes(options.level as LogLevel)
    ? (options.level as LogLevel)
    : 'info';

  const format = LogFormats.includes(options.format as LogFormat)
    ? (options.format as LogFormat)
    : 'plain';

  return new Logger({ level, format, stdout, file: filePath });
};

export {
  Logger,
  NullLogger,
  Loggable,
  LogFormats,
  LogFormat,
  LogLevels,
  LogLevel,
  createLogger,
};
