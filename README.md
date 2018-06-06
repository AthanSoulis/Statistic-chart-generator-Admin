# Statistic-chart-generator-Admin
The Admin Angular app for the [Statistic chart generator](https://github.com/AthanSoulis/Statistic-chart-generator)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
#### For Angular
Install [Node.js® and npm](https://nodejs.org/en/download/) if they are not already on your machine.

Then install the [Angular CLI](https://github.com/angular/angular-cli) globally.

`npm install -g @angular/cli`

#### For Semantic UI
Semantic UI uses [Gulp](https://gulpjs.com/) to provide command line tools for building themed versions of the library with just the components you need.

Gulp is an NPM module and must be installed globally

`npm install -g gulp`

### Installation

Use the install command on the root folder of the project 

`npm install`

After selecting the defaults on the installation of Semantic UI and the installation of the dependencies has finished, change into the semantic folder and use the gulp build command

```
cd semantic/
gulp build
```

Finally from the root folder get the project up and running, listening to **localhost:4200**

```
cd ../
npm start
```

If you are a cool guy you can also try :

 ```
 npm pstart   //p for panormos
 ```
 or
 ```
 npm vstart   //v for vatopedi
 ```
