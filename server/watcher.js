/**
 * Watcher created with chokdir instead of nodemon.
 * TODO: move utitilies functions, tinydate, serverLog,
 * path resolution into separate folder
 *
 */
const chokdir = require('chokidar');
const { join, resolve } = require('path');
const serverLog = require('logdown')('server');
const tinydate = require('tinydate');
const { magenta } = require('kleur');
const server = resolve(process.cwd(), 'server');

serverLog.state.isEnabled = true;
const watcher = chokdir.watch(server);

const timeFormat = tinydate('{HH}:{mm}:{ss}');

function toTime() {
  return '[' + magenta(timeFormat()) + ']: ';
}

module.exports = () => watcher.on('ready', function() {
  watcher.on('all', function() {
    serverLog.log(`${toTime()}Clearing module cache from server`);
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\]server[\/\\]/.test(id)) {
        delete require.cache[id];
      }
    });
  });
});
