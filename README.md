# Logging

A [winston][]-based logger with standardized JSON and plaintext formatting.

## Installation

Create a [personal access token][token] with at least `read:packages`
permissions and configure NPM:

```
cat <<EOF >> .npmrc
@reagent:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
EOF
```

Using your token, install the package:

```
$ GITHUB_TOKEN=<your token> yarn add @reagent/logging
```

## Usage

The logger supports all the common [syslog levels][]. To create your logger use
the `createLogger()` helper function and make sure you emit to either `stdout`
or a `filePath` (or both):

```typescript
import path from 'path';
import { createLogger } from '@reagent/logger';

const stdoutLogger = createLogger({ stdout: true });
stdoutLogger.info('Message to stdout'); // Will emit a message at `info` level to your console

const fileLogger = createLogger({
  filePath: path.resolve(__dirname, 'log', 'messages.log'),
});
fileLogger.info('Message to file'); // Will emit a message at `info` level to the target file
```

The logger is configured to emit logs at `'info'` level, but this can be
modified as needed:

```typescript
const { NODE_ENV } = process.env;

const logger = createLogger({
  stdout: true,
  level: NODE_ENV === 'production' ? 'warning' : 'info',
});

logger.info('Informational message'); // Not emitted in 'production'
logger.warning('Warning message');
```

By default, logs are formatted as plaintext, but you can format as `json` as well:

```typescript
const plainLogger = createLogger({ stdout: true });
plainLogger.info('Message in Plain');
// [2023-02-11T17:12:06.459Z] (info): Message in Plain

const jsonLogger = createLogger({ stdout: true, format: 'json' });
jsonLogger.info('Message in JSON');
// {"level":"info","message":"Message in JSON","timestamp":"2023-02-11T17:12:06.461Z"}
```

You can also provide a source and any additional information to the log
messages. The use of generics supports constraints and type inference for the
`source` attribute:

```typescript
const logger = createLogger<'app' | 'db'>({ stdout: true });
logger.info('Message from application', { source: 'app' });
// [2023-02-11T17:15:37.260Z] (info): Message from application source=app

logger.info('Message from database', { source: 'db' });
// [2023-02-11T17:16:33.715Z] (info): Message from database source=db

logger.info('Message from application with extra', {
  source: 'app',
  request: { path: '/user' },
});
// [2023-02-11T17:15:37.262Z] (info): Message from application with extra source=app request={"path":"/user"}
```

As in previous examples, emitting the logs as `json` is also possible.

[winston]: https://github.com/winstonjs/winston
[token]: https://github.com/settings/tokens
[syslog levels]: https://en.wikipedia.org/wiki/Syslog#Severity_level
