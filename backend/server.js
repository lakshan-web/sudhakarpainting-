import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabaseClient.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to format table name exactly as requested by user
const TABLE_NAME = 'feedback';

// GET /api/feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error on GET:', error);
      return res.status(500).json({ error: 'Failed to fetch feedback' });
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

    // Validate required fields
    if (!name || !lorryName || !phone || !rating || !message) {
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
      console.error('Supabase error on POST:', error);
      return res.status(500).json({ error: 'Failed to submit feedback' });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Server error on POST:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
