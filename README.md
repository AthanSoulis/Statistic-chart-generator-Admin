# Statistic-chart-generator-Admin

:chart_with_upwards_trend: The Admin Angular web app for the [Statistic chart generator](https://github.com/madgeek-arc/Statistic-chart-generator)

:clipboard: Follow the tasks for this project [here](https://trello.com/b/uVlUILVs/stats-tool).
  

## Getting Started for Development

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Get Angular

- Install [Node.js® and npm](https://nodejs.org/en/download/) if they are not already on your machine.

- Then install the [Angular CLI](https://github.com/angular/angular-cli) globally.
`npm install -g @angular/cli`

### Clone the project
Clone the project in a local folder.
`git clone https://github.com/madgeek-arc/Statistic-chart-generator-Admin.git`

  ### Install project dependencies
Use the `npm install` command on the root folder of the cloned project, to install project dependencies.

### Quick Start

From the root folder get the project up and running with `npm start`, listening to **localhost:4200**.

:information_source: By simply calling `npm start` you are using the default environment described in [environment.ts](src/environments/environment.ts).

  

## Guide to the project environments

  

In the [environments](src/environments) folder are defined different production and development environments.

### Back-end related environment variables

-  `apiUrl` : Describes the base URL where the Back-end api resides.
-  `apiFolder` : Describes an extension URL as a suffix to the `apiUrl`

:bulb: For a back-end residing at https://web.point/to/back/end , the variables would be set as such :
- `apiUrl` : `https://web.point`
- `apiFolder`: `/to/back/end`

### Front-end related environment variables

-  `showSchemaObject` : A flag controlling whether the underlying JSON data representation of the form is visible. Use it for development reasons only.

-  `showErrors` : A flag controlling whether the form errors are visible.

### Build related environment variables

-  `production` : A flag used to silence logs when truthy. Used in production.

  

## Using preset back-ends
:information_source: Each preset back-end URL has a specific file where its environment variables are described. 

| Back-end     | Environment variables file |
| ----------- | ----------- |
|  http://88.197.53.71:8180| [environment.back-end-vm.ts](src/environments/environment.back-end-vm.ts)|
| https://beta.services.openaire.eu| [environment.beta.ts](src/environments/environment.beta.ts)|
| https://stats.madgik.di.uoa.gr/stats-api| [environment.madgik.ts](src/environments/environment.madgik.ts)|
| http://localhost:8200| [environment.localhost.ts](src/environments/environment.localhost.ts)|



### For Development  

Serve the project locally, listening to the following preset back-ends :
- For the http://88.197.53.71:8180 back-end : `ng run stats-tool:serve:back-end-vm`
- For the https://beta.services.openaire.eu back-end : `ng run stats-tool:serve:back-end-vm`
- For the https://stats.madgik.di.uoa.gr/stats-api  back-end : `ng run stats-tool:serve:madgik`
- For the http://localhost:8200 back-end : `ng run stats-tool:serve:localhost`

### For Build

  Build the project to listen to the following preset back-ends :
- For the http://88.197.53.71:8180 back-end : `ng run stats-tool:build:back-end-vm`
- For the https://beta.services.openaire.eu back-end : `ng run stats-tool:build:back-end-vm`
- For the https://stats.madgik.di.uoa.gr/stats-api  back-end : `ng run stats-tool:build:madgik`
- For the http://localhost:8200 back-end : `ng run stats-tool:build:localhost`