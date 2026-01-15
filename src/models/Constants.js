import mongoose from 'mongoose';

const ConstantsSchema = new mongoose.Schema({
  // Singleton pattern - only one document should exist
  _id: {
    type: String,
    default: 'app_constants',
  },
  registrationCount: {
    type: Number,
    default: 0,
  },
  verifiedCount: {
    type: Number,
    default: 0,
  },
  checkedInCount: {
    type: Number,
    default: 0,
  },
  registrationOpen: {
    type: Boolean,
    default: true,
  },
  maxRegistrations: {
    type: Number,
    default: 600,
  },
  activePaymentId: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Constants || mongoose.model('Constants', ConstantsSchema);
