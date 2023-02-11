import winston from 'winston';
import stringify from 'safe-stable-stringify';

// Need this symbol key to modify message in custom Winston formatters.
// TypeScript doesn't allow indexing with Symbol, so this casting is done to get
// around that limitation. See:
//   https://github.com/microsoft/TypeScript/pull/44512
//
const MESSAGE = Symbol.for('message') as unknown as string;

const flatten = (src: object): string => {
  const serialize = stringify.configure({});

  return Object.entries(src)
    .reduce<string[]>((pairs, [key, raw]) => {
      let value = raw;

      if (!value) {
        return pairs;
      }

      if (typeof value === 'object') {
        value = serialize(raw);
      }

      return pairs.concat([key, value].join('='));
    }, [])
    .join(' ');
};

const text = winston.format((info) => {
  const { timestamp, level, message, ...rest } = info;
  info[MESSAGE] = `[${timestamp}] (${level}): ${message} ${flatten(rest)}`;

  return info;
});

const jsonFormatter = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

const plainFormatter = winston.format.combine(
  winston.format.timestamp(),
  text()
);

export { jsonFormatter, plainFormatter };
