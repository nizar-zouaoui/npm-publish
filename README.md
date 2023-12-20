# NPM Publish typed cjs and esm package

This npm package was created to test the use case of having multiple exports being used with different module types

## Build Process

In this package we use tsc as our transpiler, we set our main `tsconfig.json` that will be later used as a skeleton for our transpiler [file tsconfig.json](tsconfig.json).

### Building ESModules

For the esm build, we have a dedicated config for esm, which is `tsconfig.esm.json` [file tsconfig.esm.json](tsconfig.esm.json).

### Building CommonJS

For the cjs build, we have a dedicated config for cjs, which is `tsconfig.cjs.json` [file tsconfig.cjs.json](tsconfig.cjs.json).

### Building Types

For the types build, we have a dedicated config for types, which is `tsconfig.types.prod.json` [file tsconfig.types.prod.json](tsconfig.types.prod.json).

## Post Build

### Package.json update

We have a script that is run post build process to update the package.json with all exported files in our package so that all package users can have access to all files in the app whether they're working on CommonJs project, ESmodule projects or even typescript projects.

The script basically updates the exports and the typesVersion in the package.json [file updatePackage.js](scripts/updatePackage.js)

## Result

Using ESModule

```typescript
import add from "nizar-npm-publish-test";
import substract from "nizar-npm-publish-test/substract";
import multiply from "nizar-npm-publish-test/mult/multiply";
```

Or

Using CommonJS

```typescript
const add = require("nizar-npm-publish-test");
const substract = require("nizar-npm-publish-test/substract");
const multiply = require("nizar-npm-publish-test/mult/multiply");
```

And both work fine in TS projects.
