# Setup Guide

Follow these steps to set up the project locally:

1. Clone the repository to your local machine:
   ```bash
   git clone (https://github.com/1Elaigwu/Secure-Login-System.git)

2. Navigate to the project directory:
   ```bash
   cd secure-login-system

3. Install dependencies using npm:
   ```bash
   npm install

4. Configure the database connection:
   - Open app.js file.
   - Update the database connection parameters (host, database name, user, password) in the connection object.

5. Create the necessary database tables:
   - Use the provided SQL scripts (create-tables.sql) to create the required tables in your MySQL database.

6. Run the application: 
   ```bash
   npm start

The application should now be running locally. You can access it at http://localhost:3000.
