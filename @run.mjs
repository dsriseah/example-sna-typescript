import PATH from 'node:path';
import { SNA, PROMPTS } from 'ursys/server';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PROMPTS.TerminalLog('@run-sna', 'TagCyan');
const sna_project_dir = PATH.dirname(process.argv[1]);

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG('SNA Appserver Starting');
const app_dir = sna_project_dir;
SNA.SetServerConfig({ app_dir });
await SNA.Build(sna_project_dir, { port:3030});
