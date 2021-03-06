# Products CRUD App

### 1 Purpose
Add Create/Update/Delete features to CRA app.

### 2 Libraries
* Create react app
* Formik
* Yup
* moment.js
* reactstrap

### 3 Features
* Without React hooks, in same style as original app
* Advanced Linting
* Deploy to github pages
* Dockerfiles for local use without any dependencies
* Cypress e2e tests

### 4 Screenshot
<img src="./cypress/screenshots/spec.js/Products%20Cypress%20test%20--%20adds%20product%20validation.png" width="600">
<img src="./cypress/screenshots/spec.js/Products%20Cypress%20test%20--%20adds%20product.png" width="600">
<img src="./cypress/screenshots/spec.js/Products%20Cypress%20test%20--%20delete%20product.png" width="600">
<img src="./cypress/screenshots/spec.js/Products%20Cypress%20test%20--%20update%20product.png" width="600">

### 5 Test execution video
https://github.com/menemy/cra-products-crud/blob/master/cypress/videos/spec.js.mp4?raw=true

### 6 Demo
https://menemy.github.io/cra-products-crud/

### 7 Commands
* yarn dev-docker - Start local dev server in docker without any npm packages, listen on http://localhost:3000, support hot-reload on osx
* yarn prod-docker - Build static spa in docker and deploy in nginx without any npm packages, listen on http://localhost
* yarn cypress:docker - Run tests in docker with constant browser
* yarn install - Install required npm packages
* yarn start - Start local dev server
* yarn lint - Check code style
* yarn cypress:run - Start tests in headless browser
* yarn build - Build static spa
* yarn deploy - Build and deploy to github


