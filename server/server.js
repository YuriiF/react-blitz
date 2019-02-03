/**
 * Server implemented with Polka micro server.
 * Polka is an extremely minimal, highly performant Express.js alternative.
 * URL: https://github.com/lukeed/polka
 */
const path = require('path');
const polka = require('polka');
const serverLog = require('logdown')('server');
const { join, resolve } = require('path');
const { red, blue, green, yellow, magenta, bold } = require('kleur');
const tinydate = require('tinydate');
const watcher = require('./watcher');


const public = resolve(process.cwd(), 'public');
const server = resolve(process.cwd(), 'server');

const static = require('sirv')(public);

const { PORT = 3000 } = process.env;
serverLog.state.isEnabled = true;

const timeFormat = tinydate('{HH}:{mm}:{ss}');

function toTime() {
  return '[' + magenta(timeFormat()) + ']: ';
}

/** TODO: Run the watcher only in development mode */
watcher();

polka()
  .use(static)
  .get('*', (req, res, next) => {
    res.end('OK');
  })
  .listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    serverLog.log(`Running on: ${yellow(`http://localhost:${PORT}`)}`);
    serverLog.log('Press *Ctrl+C* to quit.');
    console.log(`   ${'-'.repeat(60)}`);
  });
