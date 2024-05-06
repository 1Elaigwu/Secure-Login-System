const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Serve static files from the 'assets' directory
app.use(express.static('assets'));

// Route handler for serving login.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/assets/login.html');
});

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'login_system',
  user: '',
  password: ''
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware function to check if user is authenticated
const authenticateUser = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Register a new user
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error: ', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Route handler for serving the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/assets/login.html');
});
