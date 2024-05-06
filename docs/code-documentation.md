# Code Documentation

This document provides detailed documentation for the codebase, focusing on relevant parts related to SQL queries, database interactions, and authentication mechanisms.

## Commenting:

Comments are essential for understanding the purpose and functionality of different code segments. In the provided codebase, comments should be added to SQL queries, middleware functions, and error handling 
sections to enhance readability and maintainability.

```javascript
// Route handler for serving login.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/assets/login.html');
});
```

## Parameterized Queries:

Parameterized queries play a crucial role in preventing SQL injection attacks by securely substituting user input values into SQL queries. In the provided codebase, parameterized queries should be used for all 
database interactions to ensure the security of the application.

```javascript
// Register a new user with parameterized query
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Hash password before storing in the database
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds = 10

    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    connection.query(query, [username, hashedPassword, email], (err, result) => {
      if (err) {
        console.error('Error registering user: ', err);
        res.status(500).json({ message: 'Error registering user' });
        return;
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error hashing password: ', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});
```

## Database Interactions:

Documents on how data flows through the application, from user input to database storage. Explains how each SQL query is constructed and executed, highlighting any security considerations.

```javascript
// Route handler for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists in the database
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Error querying database: ', err);
        res.status(500).json({ message: 'Error logging in' });
        return;
      }

      // If user not found
      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      // Compare password hashes
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Store user information in session
        req.session.user = { username: user.username, email: user.email };
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});
```

## Error Handling:
Error handling is crucial for providing informative responses to users and debugging issues in the application. Documents on how errors are handled throughout the codebase, including middleware functions and 
route handlers.

```javascript
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error: ', err);
  res.status(500).json({ message: 'Internal server error' });
});
```

## Code Structure:

Describes the overall architecture of the application, including its components and how they interact.

```javascript
// Route handler for serving the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/assets/login.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

This documentation provides insights into the codebase, helping developers understand its functionality and maintainability.
