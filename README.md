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
- [Bugs i have found](#bugs-that-might-need-to-be-checked)

## About project

This project is set to run prettier, eslint and jest on commit.
currently i do not test using jest, but added it because of requirements.
Instead i use cypress for both e2e test and unit test. these are being runned on push to most branches.

The cypress unit test are accessing cypress localstorage, and is the only thing that is diffrent from regular jest test( i test the functions i would test with jest not the front end).

## configuration and usage

### node

install all node modules

```
npm i
```

### vite base url

for vite to function on github pages this needed to be added to vite.config.js

```
  base: "/social-media-client/",
```

**_note_** this has to be the name of your repo

### deploy build

run sass and vite

```
npm run deployBuild
```

### vite dev mode

if you want to use dev version of vite

```
npm run dev
```

### vite preview build

to preview the repo

```
npm run vitePreview
```

### local environment

to run cypress or jest tests you have to add your own email and password to an .env file, check .env.example

```
EMAIL=email@example.com
PASSWORD=yourPassword
```

email and password must match an excisting profile on the api, that can be created by following the api docs here: https://noroff-api-docs.netlify.app/social-endpoints/authentication#register
or starting localhost / vite to then create a user there

### run cypress tests

to test cypress e2e and unit test

```
npm run test-e2e
```

or cli version

```
npm run test-e2e-cli
```

## things you can configurate

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

## special configuration i had to do:

### vite

#### bootsrap x vite

guide on: https://getbootstrap.com/docs/5.2/getting-started/vite/
for vite to use bootstrap, some config was needed inside vite.config.js:

I needed to add path to bootstrap node modules

```
 resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
```

to use bootstrap add this to the index.js inside src/js

```
import * as bootstrap from 'bootstrap'
```

**_note_** the above code is currently not being used, it will be used once the repo fixes with the / instead of ./ bug

### cypress

**_note_** this does not need to be changed, but was needed to be done before cypress testing

redirecting .env secrets to cypress secrets
added this to cypress.config.js:

```
require("dotenv/config");"

```

and

```env: {
      EMAIL: process.env.EMAIL,
      PASSWORD: process.env.PASSWORD,
    }
```

### eslint

due to some bugs with eslint and cypress, i needed to move overrides out and into regular

before:

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

after:

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

the reason this is needed is to stop eslint from giving errors on cy commands inside cypress commands.js.
i dont know if this will affect anything else later

## bugs that might need to be checked

- id in api/profiles/updates.js?
