/**
 * Logger middleware, you can customize it to make messages more personal.
 *
 */
const ip = require('ip');
const { red, blue, green, magenta, gray, bold, italic } = require('kleur');
const serverLog = require('logdown')('server');
const { toTime } = require('./time');

serverLog.state.isEnabled = true;

const divider = gray('\n-----------------------------------');

const logger = {
  /** Called whenever there's an error on the server we want to print. */
  error: (err) => {
    serverLog.error(red(err));
  },

  /** Called when express.js app starts on given port w/o errors */
  appStarted: (port, host, tunnelStarted) => {
    serverLog.log(bold(`${toTime()}Server started! ${green('✓')}`));

    /** If the tunnel started, log that and the URL it's available at */
    if (tunnelStarted) {
      serverLog.log(`Tunnel initialised ${green('✓')}`);
    }

    serverLog.log(`${bold('Access URLs:')}${divider}
Localhost: ${magenta(`http://${host}:${port}`)}
      LAN: ${magenta(`http://${ip.address()}:${port}`) +
        (tunnelStarted
          ? `\n    Proxy: ${magenta(tunnelStarted)}`
          : '')}${divider}
${blue(`Press ${italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = logger;
