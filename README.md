# course asignment for Workflow

- babel is added so testing will be easier later

## automation added:

- prettier to better format code
- eslint to fix small errors in code
- jest should work, but no test files yet
- using vite to create dist folder that will be deployed to github pages
- pages.yml sets up node to create the vite dist and deploys the dist folder to pages
- npm script viteBuild fixes the css and then uses it to deploy vite to dist folder (and removes the css that was created with sass in the same folder)
- vite.config.js adds the correct configuration to make vite use bootstrap with help from https://getbootstrap.com/docs/5.2/getting-started/vite/

## bugs that might need to be checked

- id in api/profiles/updates.js?
