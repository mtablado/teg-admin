import { debug } from 'debug';

// by default stderr is used
// error('goes to stderr!');

export const log = debug('eg-admin');
debug.enable('eg-admin:*');
// set this namespace to log via console.log
log.log = console.log.bind(console); // don't forget to bind to console!
// log('goes to stdout');
// error('still goes to stderr!');

// set all output to go via console.info
// overrides all per-namespace log settings
// debug.log = console.info.bind(console);
// error('now goes to stdout via console.info');
// log('still goes to stdout, but via console.info now');
