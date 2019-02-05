/**
 * Server implemented with Polka micro server.
 * Polka is an extremely minimal, highly performant Express.js alternative.
 * URL: https://github.com/lukeed/polka
 *
 */
const polka = require('polka');
const { resolve } = require('path');

/** Custom Import's */
const logger = require('./utils/logger');
const argv = require('./utils/argv');
const port = require('./utils/port');
const setup = require('./middlewares/frontendMiddleware');
// const watcher = require('./watcher');

const isDev = process.env.NODE_ENV !== 'production';
const app = polka();

/**
 * In production we need to pass these values in instead of relying on webpack.
 */
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

/** get the intended host and port number, use localhost and port 3000 if not provided */
const customHost = argv.host || process.env.HOST;
/** Let http.Server use its default IPv6/4 host */
const host = customHost || null;
const prettyHost = customHost || 'localhost';

/** TODO: Run the watcher only in development mode */
// watcher();

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.setHeader('Content-Encoding', 'gzip');
  next();
});

app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
