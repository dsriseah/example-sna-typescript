This is a minimal [URSYS/SNA](https://github.com/dsriseah/ursys/wiki/Overview-of-SNA) project template. You can clone it as-is and modify it to create a simple development client-server web application that uses network messages to communicate. This is a terminal-based project.

## Instructions for creating minimal project from scratch

### Assumptions

At minimum, you'll need **git** installed on your system in a unix-like environment like Linux, MacOS, or Windows Linux Subsystem. If `git --version` doesn't work or reports a version less than 2.1.x, look up how to install it on your particular system. And of course you'll need a version of **nodejs** installed of version `18.x.x` or higher.

While this example doesn't require anything else than git and node, I use the following tools for URSYS development:
- **Visual Studio Code** (VSCODE) with special environment detection scripts (not in SNA, but part of the parent URSYS framework)
- **Node Version Manager** (NVM) is used to manage different versions of nodejs per-folder, which simplifies managing multiple projects that use different versions of the node engine.
- **Chrome** browser is the testing target, particularly in the Javascript console output.

### 1. Create a new git repo
From the terminal, create a directory and initialize its basic git and package initialization.
```
mkdir simple-ursys
npm init -y
git init
```
Next, install the ursys tarball from its current hosted location
```
npm install https://dsriseah.com/_tarballs/ursys-0.0.1.tgz
```

<details>
<summary>alternate installation</summary>
Alternatively, you could download the tarball someewhere and do a file-based installed:
```
npm install file:./path/to/downloaded/ursys-0.0.1.tgz
```

If you want to have source access to the full codebase, create your folder in the root of the [ursys repo](https://github.com/dsriseah/ursys) and name the folder `app-myapp`. The `app-` prefix will be gitignored.
</details>


### 2. Create a node version manager root file
SNA detects the root directory of the project by searching for a `.nvmrc`, so you must create it. This file is used by [Node Version Manager](https://github.com/nvm-sh/nvm) with the `nvm use` command, but this example just needs to be able to find the file.

Run this command at the root level of the repo:
```
node version > .nvmrc
```

### 3. Create the AppServer

The SNA framework uses NodeJS to bundle your source files and serve them using a local webserver. Enter the minimum boilerplate into a new file called `@run.mjs`

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

Next, add an npm script to run the AppServer by adding a **dev** script to `package.json`:
```json
  ...
  "scripts": {
    "dev": "node @run.mjs"
  }
  ...
```

### 4. Start the AppServer
Back in the terminal, use the script we've just defined to start the AppServer
```
npm run dev 
```
You'll see information appear in the terminal, including the **url** that you can
enter into a browser like Chrome. Do that now. By default the URL is `localhost:8080` or similar.

You'll notice that there isn't much happening because we haven't added any HTML or custom application scripts yet. We'll do that next.


### 5a. Create the index.html file

When the AppServer runs, it creates the necessary folders it expects to put your content. For assets that are to be copied as-is to the AppServer's public folder, use **app-static**.

Let's create a minimal `index.html` file in `app-static`
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

This HTML file refers to three important assets that we need to create next:
- `styles.css` which will go into `app-static` 
- `favicon.svg` which also goes into `app-static`, creating the site's 
- `js/bundle.js` which will be created by the SNA AppServer from any source code you've defined

### 5b. Create the styles.css file
Create `styles.css` in the `app-static` directory
```css
body {
  font-family: Georgia, serif;
  background-color: lightgray;
  color: #333;
  font-family: monospace;
  line-height: 1.75em;
}
```

### 5c. Create the favicon.svg file
Create the `favicon.svg` file in the `app-static` directory
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-label="URSYS Logo">
<rect x="10" y="10" width="80" height="80" stroke="gray" stroke-width="20" fill="none" />
<rect x="30" y="30" width="40" height="40" fill="orange" />
</svg>
```

### 5d. Restart the AppServer

If the AppServer is still running 

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
