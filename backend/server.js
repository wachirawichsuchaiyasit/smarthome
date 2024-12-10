const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    password: '131247',
    host: 'localhost',
    database: 'postgres', // ชื่อ database ที่เห็นในภาพ
    port: 5432
});


function validateRegister(username, email, password, confirmPassword) {
    const errors = [];
    
    if (!username || username.length < 3) {
        errors.push('Username must be at least 3 characters');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Invalid email format');
    }
    
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    
    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    return errors;
}

app.post('/api/user/register', async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        
        const errors = validateRegister(username, email, password, confirmPassword);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );
        
        res.json({ 
            message: 'Registration successful',
            user: {
                id: newUser.rows[0].id,
                username: newUser.rows[0].username,
                email: newUser.rows[0].email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/user/login', async (req, res) => {
    console.log("work")
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }
        
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );
        
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        console.log(user)
        res.json({ 
            message: 'Login successful',
            user: {
                id: user.rows[0].Id,
                username: user.rows[0].username,
                email: user.rows[0].email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
*/

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  