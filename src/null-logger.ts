import { Loggable } from './types';

export class NullLogger implements Loggable<string> {
  /* eslint-disable @typescript-eslint/no-empty-function*/
  emerg(): void {}
  alert(): void {}
  crit(): void {}
  err(): void {}
  warning(): void {}
  notice(): void {}
  info(): void {}
  debug(): void {}
  /* eslint-enable @typescript-eslint/no-empty-function*/
}
