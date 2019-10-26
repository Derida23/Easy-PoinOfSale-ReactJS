
# Easy Point of Sale

Easy Point Of Sale is a web-based application that is useful for the needs of grocery stalls, with not much product coverage and only has admin access rights as the manager of the point of sell.

Inside there are features of updating, deleting, creating, and displaying products, categories and orders for each sale, the system is website based and is still in the design process.
## Built With
[![Express.js](https://img.shields.io/badge/reactjs-16.10.2-yellow?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/materialui-4.5.1-greenstyle?rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/reactrouterdom-5.1.2-blue?rounded-square)](https://www.npmjs.com/search?q=mysql) [![MySQL](https://img.shields.io/badge/reactnumberformat-1.19.0-red?rounded-square)](https://www.npmjs.com/package/body-parser) [![CORS](https://img.shields.io/badge/cors-2.8.5-lightgrey?style=rounded-square)](https://www.npmjs.com/package/cors) [![CORS](https://img.shields.io/badge/jsonwebtoken-8.5.1-yellowgreen?style=rounded-square)](https://www.npmjs.com/package/jsonwebtoken)

## Requirements
1. [Node JS](https://nodejs.org/en/download/)
2. [React JS](https://reactjs.org/)
3. Web Server (ex. localhost)

## Getting Started
Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

``npm install``

In order to run the application Type the following command

``npm start``

The Application Runs on  **localhost:3000**

## Application design
1.  **Product**  Component : This Component displays a list of product. This Component gets the data from a json file in my other project in express JS check my repository *API Express Point of Sale*

2.  **Category**  Component : This Component Displays  category. This Component gets its data from a my other project in express JS check my repository *API Express Point of Sale*


## HTTP client
**axios**  library is used to make HTTP Calls, Open source library which is currently the most booming to make HTTP requests because it has many advantages

## URL
The application has just one url /customerlist which ties to  _Customers_  Component
