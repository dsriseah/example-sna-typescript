This is a minimal [URSYS/SNA](https://github.com/dsriseah/ursys/wiki/Overview-of-SNA) project template. You can clone it as-is and modify it to create a simple development client-server web application that uses network messages to communicate. 

There are currently two examples available that are designed to work with Visual Studio Code Live Linting:
- [NodeJS](https://github.com/dsriseah/example-sna-nodejs) version
- [Typescript](https://github.com/dsriseah/example-sna-typescript) version

The difference is that the Typescript version can support dynamically-loaded server-side Typescript modules, whereas the NodeJS version only allows loading CommonJS.
Typescript configuration is not straightforward.

Both versions import the URSYS library as a tagged release. 

> [!NOTE]
> URSYS doesn't yet export type information correctly, so live-linting in the VSCode Editor doesn't work. The code will still transpile and run since it ignores Typescript as has been the tradition with tools like Babel and TSX.

# How to Make an SNA Project from Scratch

See [README-JS](README-JS).

