import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    currency: { type: String, default: 'INR' },
    theme: { type: String, default: 'light' }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
