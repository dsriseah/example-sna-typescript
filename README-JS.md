# Requirements

At minimum, you'll need **git** installed on your system in a unix-like environment like Linux, MacOS, or Windows Linux Subsystem. If `git --version` doesn't work or reports a version less than 2.1.x, look up how to install it on your particular system. And of course you'll need a version of **nodejs** installed of version `18.x.x` or higher. 

<details><summary>Optional Tools</summary>

While this example doesn't require anything else than git and node, I use the following tools to ease development:
- **Visual Studio Code** (VSCODE) with special environment detection scripts (not in SNA, but part of the parent URSYS framework)
- **Node Version Manager** (NVM) is used to manage different versions of nodejs per-folder, which simplifies managing multiple projects that use different versions of the node engine.
- **Chrome** browser is the testing target, particularly in the Javascript console output.

</details>

# Quick Installation

1. Make sure you have nodejs version 18.18.2 or higher installed (terminal commmand: `node --version`) on a unix-like operating system.
2. Open a terminal and cd to a directory where you want to clone the repo
3. `git clone https://github.com/dsriseah/example-sna-nodejs.git my-sna-repo`
4. `cd my-sna-repo`
5. `npm ci`
6. `npm run dev`
7. open web browser and browse to `http://localhost:3030`

For more insight into what's happening, read the next section.

# Manual SNA Installation

If you want to try integrating SNA into your own code, these instructions are for you.

### 1. Create a new git repo
From the terminal, create a directory and initialize its basic git and package initialization.
```
mkdir simple-ursys
npm init -y
git init
```
Next, install the ursys tarball from its current hosted location. SNA is part of URSYS!
```
npm install https://dsriseah.com/_tarballs/ursys-0.0.1.tgz
```

<details><summary>Alternate URSYS Install Methods</summary>
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
await SNA.Build(sna_project_dir, { port:3030 });
```

Next, add an npm script to run the AppServer by adding a **dev** script to `package.json`:
```
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
enter into a browser like Chrome. Do that now. By default the URL is `localhost:3030` or similar.
You can change 

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
This is a graphic description language, drawing an orange square with a translucent stroke around it that appears as the icon in the brower tab. If you already have a `favicon.ico` you like, copy it to the `app-static` directory. Then, modify the HTML to load it (as this one has a different extension of `.svg`).

### 5d. Restart the AppServer

If the AppServer is still running in the terminal, stop it with `CTRL-C` and rerun the command:
```
npm run dev
```
With luck, you should see an updated web page!

### 6. Concept: Application Entry Points

An "entry point" is the starting javascript file that is used to create a "bundle" that can be loaded into the browser. In the above HTML index file, there is a `<script>` tag that refers to `js/bundle.js`. This file is created by the SNA AppBuilder which uses **esbuild** to create the bundle from the entry point and any of the modules it imports.

The AppBuilder scans the **app-source** directory to find entry points, using the following convention:
- files ending with `.ts` are **web bundle entry points** 
- files ending with `.mts` are **server modules** that are dynamically loaded to provide additional services 

Only the top-level files are scanned; if you put a file in a subdirectory it will not be processed by the SNA AppBuilder. This is a good way to hide supporting library files.

> [!NOTE]
> Server modules are not supported in this repo. See the repo [example-sna-tsx](github.com/dsriseah/example-sna-tsx) for that feature.

SNA uses **typescript** files as its input. If you're not familiar with Typescript, you can write regular Javascript code and it should work just fine. 

> [!NOTE] 
> As Typescript configuration for a framework is a pain in the ass, that configuration is handled in the repo [example-sna-tsx](github.com/dsriseah/example-sna-tsx).

### 6a. Create an application entry point

We will create a single entry point called **app.ts**, which will go into the `app-source` directory:
```ts
import { ConsoleStyler, SNA } from 'ursys/client';

const PR = ConsoleStyler('App','TagPink');
const LOG = console.log.bind(console);

(async () => {
  LOG(...PR('Starting App'));
  await SNA.Start();
})();
```
If the AppServer is still running in the terminal, stop it with `CTRL-C` then re-run `npm run dev`. 

While you won't see any visible differences in the browser, there are several new features enabled that leave crumbs in browser's javascript console:

- **Live reload** is now active. If you change the source code in the `index.html` or `app.ts` files, you should see the browser automatically refresh, which saves time iterating through code changes. If you add a _new_ file, though, you'll have stop/restart the AppServer as you did above.
- The **Javascript console** now is emitting prettified log messages. You'll also see the message "Starting App" appear next to a colored tag that reads "App". This is an URSYS feature that is used both on server-side and client-side code to help differentiate important module messages from each other.
- **Networking** is now enabled. If you like at the nodejs terminal output, you'll see a message like `URSERVE UR_001 client connected`. It's possible for clients to send messages to each other, defined through the SNA API through methods like `AddMessaageHandler()` 
- **App Lifecycle Hooks** are now enabled. The browser console shows a message `sna.hook SNA AppLifecycle is starting`, which provides a way to carefully stage operations so that groups of functions finish one-after-the-other in an orderly fashion. This is also provided through the SNA API through methods like `HookAppPhase()`. 

# Next Steps

This is the barest minimum boilerplate for SNA and is a work in progress. Examples describing how Networking and Lifecycle Hooks are used will be provided as separate repos.
