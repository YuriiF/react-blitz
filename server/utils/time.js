/**
 * Time formating helpers.
 */
const tinydate = require('tinydate');
const { magenta } = require('kleur');

const timeFormat = tinydate('{HH}:{mm}:{ss}');

function toTime() {
  return '[' + magenta(timeFormat()) + '] ';
}

module.exports = {
  toTime
};
