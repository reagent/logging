const LogFormats = ['json', 'plain'] as const;
const LogLevels = [
  'emerg',
  'alert',
  'crit',
  'err',
  'warning',
  'notice',
  'info',
  'debug',
] as const;

type LogFormat = typeof LogFormats[number];
type LogLevel = typeof LogLevels[number];

type MessageOptions<S extends string> = {
  source?: S;
  [key: string]: any;
};

type LoggerFunc<S extends string> = (
  message: string,
  options?: MessageOptions<S>
) => void;

type Loggable<S extends string = string> = {
  [key in LogLevel]: LoggerFunc<S>;
};

export {
  LogFormats,
  LogFormat,
  LogLevels,
  LogLevel,
  MessageOptions,
  LoggerFunc,
  Loggable,
};
