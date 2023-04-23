# PhantomPlans
## Instructions to set up the project to run on your machine
### 1. Clone the repository
### 2. Get the modules for client and server folders
- Open the repository in your preffered IDE
- Get into the client folder and get the node_modules folder using:
```
cd phantom_plans_front
npm install
npm start
```
- Get into the server folder and get the node_modules folder using:
```
cd phantom_plans_server
npm install
npm start
```
### 3. Configure the database connection
**Note**: This program is using MySQL
- The configuration is already done and if you didn't change the credentials in MySQL Workbench all you have to do is:
  - go to `index.js` in the server folder
  - change the database name from `phantom_plans_db` to your database name
  - **Note**: your database should contain a user and task table, I will provide the tables with the content later.
### 4. Have fun playing with my project
#### Errors when trying to start the client and server modules
If you encounter any errors starting those modules what you can do and worked for me is:
1. Delete the node_modules folder
2. Use the following commands:
```
npm clean cache --force
npm install --force
```
**Note**: You must use this commands in each module separately.
3. Try again to start the modules
 
