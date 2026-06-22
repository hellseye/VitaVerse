import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  phone: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

export default Waitlist;
