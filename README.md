 
# Employee Tracker
  Track and manage your employee database from the command line.
 

## Table of Contents
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Questions](#questions)


## Installation Instructions
### Requires 
- `node.js`
- `MySQL`
- `npm`
  - `inquirer`
  - `mysql2`
  - `console.table`

After forking and downloding the project, locate the folder and install the dependencies with the following command in the command line:
```
npm i
```
### Connect to the database
After the dependencies have been installed you need to initialise the database with the schema.

Using the same directory path in the command line start MySQL in your preffered CLI, use the following command to run the schema:
```
SOURCE db/schema.sql;
```
`<!-- If you want to populate the database from scratch you can skip this next step -->`

Run the following command to populate the database with provided data:
```
SOURCE db/seeds.sql;
```

[sql-init](https://user-images.githubusercontent.com/85494162/141780484-43f87ba3-571e-4dc4-bf07-6f54f496414c.mp4)


## Usage 

### Input MySQL credentials
In `server.js` from `line 9` insert your SQL credentials for the application to access the database
```js
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // ADD YOUR USERNAME
    user: "USERNAME HERE",
    // ADD YOUR PASSWORD
    password: "PASSWORD HERE",
    database: "companyEmployees_db",
  },
```

Now you can finally run the following command in the next line to start the application:
```
npm start
```


## Questions
Contact me on [Github](https://github.com/gitme-waffles) if you have any questions  
