# course asignment for Workflow

## github pages status

[![Deploy static content to Pages](https://github.com/puggen1/social-media-client/actions/workflows/pages.yml/badge.svg)](https://github.com/puggen1/social-media-client/actions/workflows/pages.yml)

## e2e testing and unit testing

[![test both unit tests and e2e tests](https://github.com/puggen1/social-media-client/actions/workflows/cypressTest.yml/badge.svg)](https://github.com/puggen1/social-media-client/actions/workflows/cypressTest.yml)

## list of content

- [About project](#about-project)
- [Configuration and usage](#configuration)
  - [Node](#node)
  - [Vite](#vite-base-url)
  - [Deploy Build](#deploy-build)
  - [Vite dev mode](#vite-dev-mode)
  - [vite preview build](#vite-preview-build)
  - [Local environment](#local-environment)
  - [Run cypress](#run-cypress-tests)
- [Things you can configurate](#things-you-can-configurate)
  - [Vite](#vite)
- [Configuration i had to do](#special-configuration-i-had-to-do)
  - [Vite](#vite-1)
  - [Cypress](#cypress)
  - [Eslint](#eslint)
- [Bugs i have found](#bugs-and-issues)
- [Jest](#jest)

## About project

This project is set to run prettier, eslint and jest on commit.
Currently i do not test using jest, but added it because of requirements.
Instead i use cypress for both e2e test and unit test. these are being runned on push to most branches.

The cypress unit test are accessing cypress localstorage, and is the only thing that is diffrent from regular jest test( i test the functions i would test with jest not the front end).

## configuration and usage

### node

Install all node modules

```
npm i
```

### vite base url

For vite to function on github pages this needed to be added to vite.config.js

```
  base: "/social-media-client/",
```

**_note_** This has to be the name of your repo

### deploy build

run sass and vite

```
npm run deployBuild
```

### vite dev mode

If you want to use dev version of vite

```
npm run dev
```

### vite preview build

To preview the repo

```
npm run vitePreview
```

### local environment

To run cypress or jest tests you have to add your own email and password to an .env file, check .env.example

```
EMAIL=email@example.com
PASSWORD=yourPassword
```

Email and password must match an excisting profile on the api, that can be created by following the api docs here: https://noroff-api-docs.netlify.app/social-endpoints/authentication#register
or starting localhost / vite to then create a user there

### run cypress tests

To test cypress e2e and unit test

```
npm run test-e2e
```

or cli version

```
npm run test-e2e-cli
```

## Things you can configure

### vite

To change vite output folder:
Change this inside vite.config.js

```
build: {
    outDir: "./nameOfFolderHere",
  }
```

**_important_** If the above is changed, you also need to change folder on pages.yml

```
  path: "./nameOfFolderHere"
```

## Special configuration i had to do:

### Vite

#### Bootsrap x vite

Guide on: https://getbootstrap.com/docs/5.2/getting-started/vite/
For vite to use bootstrap, some config was needed inside vite.config.js:

I needed to add path to bootstrap node modules

```
 resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  }
```

To use bootstrap add this to the index.js inside src/js

```
import * as bootstrap from 'bootstrap'
```

**_note_** The above code is not being used because of cypress and liveserver not working as intended, cdn is used for now...

### cypress

**_note_** This does not need to be changed, but was needed to be done before cypress testing

Redirecting .env secrets to cypress secrets
added this to cypress.config.js:

```
require("dotenv/config");"

```

And

```
env: {
      EMAIL: process.env.EMAIL,
      PASSWORD: process.env.PASSWORD,
    }
```

### eslint

Due to some bugs with eslint and cypress, i needed to move overrides out and into regular

Before:

```
{
    "env": {
        "browser": true,
        "es2021": true,
        "node":true,
        "jest/globals": true,
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "files": ["**/*.cy.js"],
            "env":{ "cypress/globals":true},
            "plugins":["cypress"],
            "extends": ["plugin:cypress/recommended"],
            "rules": {
              "cypress/no-unnecessary-waiting": "off",
              "no-unused-vars": "off",
              "cypress/no-async-tests": "warn"
            }
          }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": "warn"
    },
        "plugins": ["jest"]
}

```

After:

```
{
    "env": {
        "browser": true,
        "es2021": true,
        "node":true,
        "jest/globals": true,
        "cypress/globals":true
        },
    "extends": ["eslint:recommended"],
    "overrides": [
        {
            "files": ["**/*.cy.js"],
            "extends": ["plugin:cypress/recommended"],
            "rules": {
              "cypress/no-unnecessary-waiting": "off",
              "no-unused-vars": "off"
              //"cypress/no-async-tests": "warn"
            }
          }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": "warn"
    },
        "plugins": ["jest", "cypress"]
}

```

The reason this is needed is to stop eslint from giving errors on cy commands inside cypress commands.js.
I dont know if this will affect anything else later.

## bugs and issues

Added issue #73 - bug with paths, has now been fixed

Minor issue:
Since i link all bootstrap using import \* as bootstrap from "bootstrap" inside index.js. the live server and cypress won't work because of this, only vite works as intended.
Potential fix is to run set cypress to run on vite build, but server have to be up for it to work...

Minor issue:
If user dont have avatar and you go to the profile, it won't show placeholder avatar... only on thumbnail.. or is this caused by bad link from user?

problematic issue:
Sometimes the cypress test fails, it is either the create post e2e test or fail to create post 2e2 test.
if i rerun the test usually it works, the errors i get change, sometimes it is error: typeError Cannot read property 'value' of null, and sometimes the url does not change... so when the test expect it to change it fails.

problem with the typeError is caused by profile.name does not excist in localstorage, and it gives an error, this can be fixed by adding an error exception...

## Jest

I did not create jest tests for diffrent modules inside the repo, only a sample so jest tests it. this is because i needed localstorage for most of the functions and many rely on many others
