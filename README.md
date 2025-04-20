### REQUIREMENTS
- git is installed 
- nvm is installed to manage node versions

### CREATE A NEW REPO
```
mkdir simple-ursys
npm init -y
git init
npm install https://dsriseah.com/_tarballs/ursys-0.0.1.tgz
- or -
npm install file:./path/to/downloaded/ursys-0.0.1.tgz
```

### CREATE NVM CONFIG FILE
```
nvm version > .nvmrc
```

### CREATE MINIMAL RUN FILE

Create minimal appserver `@run.mjs`
```js
import PATH from 'node:path';
import { SNA, PROMPTS } from 'ursys/server';

/// CONSTANTS & DECLARATIONS ///

const LOG = PROMPTS.TerminalLog('@run-sna', 'TagCyan');
const sna_project_dir = PATH.dirname(process.argv[1]);

/// RUNTIME ///

LOG('SNA Appserver Starting');
const app_dir = sna_project_dir;
SNA.SetServerConfig({ app_dir });
await SNA.Build(sna_project_dir);
```

### ADD NPM SCRIPT TO START APPSERVER
Add `dev` script to `package.json`
```json
  "scripts": {
    "dev": "node @run.mjs"
  }
```

### RUN THE APPSERVER

```
npm run dev 
```
then browse to `http://localhost:8080` in a web browser.

### ADD INDEX FILE

create file `app-static/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="/favicon.svg" sizes="any" />
  <title>Example SNA Application</title>
</head>
<body>
  <p>
  SNA is a variant of URSYS that is modeled loosely on Microsoft's XNA
  framework. It is a component-based lifecycle system for making realtime web
  applications with networking support.
  </p>
  <!-- load the client-side code from built bundle -->
  <script src="js/bundle.js"></script>
</body>
</html>
```
create `app-static/styles.css`
```css
body {
  font-family: Georgia, serif;
  background-color: lightgray;
  color: #333;
  font-family: monospace;
  line-height: 1.75em;
}
```
create `app-static/favicon.svg`
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-label="URSYS Logo">
<rect x="10" y="10" width="80" height="80" stroke="gray" stroke-width="20" fill="none" />
<rect x="30" y="30" width="40" height="40" fill="orange" />
</svg>
```

Refresh the browser to see the effect of these changes. 

### ADD APP ENTRY POINT

Top-level files in `app-source` directory are "entry points"
- files ending with `.ts` are web bundle entry points for typescript
- files ending with `.mts` are server entry points

create `app-source/app.ts` 
```ts
import { ConsoleStyler, SNA } from 'ursys/client';

const PR = ConsoleStyler('App','TagPink');
const LOG = console.log.bind(console);

(async () => {
  LOG(...PR('Starting App'));
  await SNA.Start();
})();
```
Quit and restart the appserver with `CTRL-C` then `npm run dev` then look at the browser.
Open the javsascript console and you'll see the 'starting app' message.