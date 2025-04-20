import { ConsoleStyler, SNA } from 'ursys/client';

/// CONSTANTS ///

const PR = ConsoleStyler('App','TagPink');
const LOG = console.log.bind(console);

/// RUN ///

(async () => {
  LOG(...PR('Starting App'));
  await SNA.Start();
})();