import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabaseClient.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Global logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Helper to format table name exactly as requested by user
const TABLE_NAME = 'feedback';

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// GET /api/feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('\n--- Supabase GET Error ---');
      console.error(error);
      console.error('--------------------------\n');
      return res.status(500).json({ error: 'Failed to fetch feedback', details: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error on GET:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, lorryName, phone, rating, message } = req.body;
    console.log('\n--- Incoming POST Request ---');
    console.log('Body:', req.body);
    console.log('-----------------------------\n');

    // Validate required fields
    if (!name || !lorryName || !phone || rating === undefined || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          name,
          lorry_name: lorryName,
          phone,
          rating: Number(rating),
          message
        }
      ])
      .select();

    if (error) {
      console.error('\n--- Supabase POST Error ---');
      console.error(error);
      console.error('---------------------------\n');
      return res.status(500).json({ error: 'Failed to submit feedback', details: error.message });
    }

    res.status(201).json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Server error on POST:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Catch-all 404 error handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`\n========================================`);
  console.log(`🚀 Backend server is running!`);
  console.log(`📡 Listening on http://localhost:${port}`);
  console.log(`========================================\n`);
});
