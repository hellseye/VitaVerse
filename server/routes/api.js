import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Waitlist from '../models/Waitlist.js';
import Feedback from '../models/Feedback.js';
import { getDbStatus } from '../config/db.js';

const router = express.Router();

// File paths for local fallback
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

// Ensure directories and files exist for JSON fallback
function ensureLocalFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(WAITLIST_FILE)) {
    fs.writeFileSync(WAITLIST_FILE, '[]\n');
  }
  if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.writeFileSync(FEEDBACK_FILE, '[]\n');
  }
}

function readJsonFile(filePath) {
  try {
    ensureLocalFiles();
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeJsonFile(filePath, data) {
  try {
    ensureLocalFiles();
    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  } catch (err) {
    console.error(`Error writing to local JSON file ${filePath}:`, err);
  }
}

// @route   POST /api/waitlist
// @desc    Add a new entry to the waitlist (MongoDB or Local JSON fallback)
router.post('/waitlist', async (req, res) => {
  try {
    const { fullName, email, phone, city } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ ok: false, error: 'Full name and email are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (getDbStatus()) {
      // Check for duplicate in MongoDB
      const existing = await Waitlist.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(400).json({ ok: false, error: 'Email already registered' });
      }

      const waitlistEntry = new Waitlist({ fullName, email: normalizedEmail, phone, city });
      await waitlistEntry.save();
      return res.status(201).json({ ok: true, data: waitlistEntry });
    } else {
      // Local JSON Fallback Mode
      const entries = readJsonFile(WAITLIST_FILE);
      const existing = entries.find(
        (e) => e.email && e.email.trim().toLowerCase() === normalizedEmail
      );
      if (existing) {
        return res.status(400).json({ ok: false, error: 'Email already registered' });
      }

      const newEntry = {
        _id: `local_${new Date().getTime()}`,
        fullName,
        email: normalizedEmail,
        phone,
        city,
        submittedAt: new Date().toISOString()
      };
      entries.push(newEntry);
      writeJsonFile(WAITLIST_FILE, entries);
      console.log(`[Local Fallback] Saved waitlist entry: ${normalizedEmail}`);
      return res.status(201).json({ ok: true, data: newEntry, fallback: true });
    }
  } catch (error) {
    console.error('Error in POST /api/waitlist:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// @route   GET /api/waitlist
// @desc    Retrieve all waitlist entries (MongoDB or Local JSON fallback)
router.get('/waitlist', async (req, res) => {
  try {
    if (getDbStatus()) {
      const entries = await Waitlist.find().sort({ submittedAt: -1 });
      return res.status(200).json({ ok: true, data: entries });
    } else {
      // Local JSON Fallback Mode
      const entries = readJsonFile(WAITLIST_FILE);
      entries.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      return res.status(200).json({ ok: true, data: entries, fallback: true });
    }
  } catch (error) {
    console.error('Error in GET /api/waitlist:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// @route   POST /api/feedback
// @desc    Submit user feedback (MongoDB or Local JSON fallback)
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, feedback, rating } = req.body;

    if (!name || !email || !feedback || rating === undefined) {
      return res.status(400).json({ ok: false, error: 'Name, email, feedback, and rating are required' });
    }

    if (getDbStatus()) {
      const feedbackEntry = new Feedback({ name, email, feedback, rating });
      await feedbackEntry.save();
      return res.status(201).json({ ok: true, data: feedbackEntry });
    } else {
      // Local JSON Fallback Mode
      const entries = readJsonFile(FEEDBACK_FILE);
      const newEntry = {
        _id: `local_${new Date().getTime()}`,
        name,
        email,
        feedback,
        rating: Number(rating),
        submittedAt: new Date().toISOString()
      };
      entries.push(newEntry);
      writeJsonFile(FEEDBACK_FILE, entries);
      console.log(`[Local Fallback] Saved feedback entry from: ${email}`);
      return res.status(201).json({ ok: true, data: newEntry, fallback: true });
    }
  } catch (error) {
    console.error('Error in POST /api/feedback:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// @route   GET /api/feedback
// @desc    Retrieve all feedback entries (MongoDB or Local JSON fallback)
router.get('/feedback', async (req, res) => {
  try {
    if (getDbStatus()) {
      const entries = await Feedback.find().sort({ submittedAt: -1 });
      return res.status(200).json({ ok: true, data: entries });
    } else {
      // Local JSON Fallback Mode
      const entries = readJsonFile(FEEDBACK_FILE);
      entries.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      return res.status(200).json({ ok: true, data: entries, fallback: true });
    }
  } catch (error) {
    console.error('Error in GET /api/feedback:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

export default router;
