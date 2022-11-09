# course asignment for Workflow

## github pages status

[![Deploy static content to Pages](https://github.com/puggen1/social-media-client/actions/workflows/pages.yml/badge.svg)](https://github.com/puggen1/social-media-client/actions/workflows/pages.yml)

## e2e testing and unit testing

[![test both unit tests and e2e tests](https://github.com/puggen1/social-media-client/actions/workflows/cypressTest.yml/badge.svg)](https://github.com/puggen1/social-media-client/actions/workflows/cypressTest.yml)

- babel is added so testing will be easier later

## automation added:

- prettier to better format code
- eslint to fix small errors in code
- jest should work, but no test files yet

## configuration

intall all node modules

```
npm i
```

run sass and vite

```
npm run deployBuild
```

if you want to use dev version of vite

```
npm run dev
```

to preview the repo

```
npm run vitePreview
```

to do tests in jest you have to add your own email and password to an .env file, check .env.example

```
EMAIL=email@example.com
PASSWORD=yourPassword
```

## bugs that might need to be checked

- id in api/profiles/updates.js?
