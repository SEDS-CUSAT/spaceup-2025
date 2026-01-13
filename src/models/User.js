import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      'Please provide a valid email address',
    ],
  },
  whatsappNumber: {
    type: String,
    required: [true, 'Please provide your WhatsApp number'],
  },
  collegeName: {
    type: String,
    required: [true, 'Please provide your college name'],
  },
  yearOfStudy: {
    type: String,
    required: [true, 'Please provide your year of study'],
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Graduated', 'Other'],
  },
  workshop: {
    type: String,
    required: [true, 'Please select a workshop'],
  },
  attendedBefore: {
    type: String,
    required: [true, 'Please answer if you have attended before'],
    enum: ['Yes', 'No'],
  },
  foodPreference: {
    type: String,
    required: [true, 'Please select your food preference'],
    enum: ['Veg', 'Non-Veg'],
  },
  referralSource: {
    type: String,
    required: false,
  },
  referralCode: {
    type: String,
    required: false,
  },
  upiTransactionId: {
    type: String,
    required: [true, 'Please provide the UPI Transaction ID'],
    unique: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  paymentScreenshotUrl: {
    type: String,
    required: [true, 'Please upload the payment screenshot'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
    required: false,
  },
  isCheckedIn: {
    type: Boolean,
    default: false,
  },
  checkedInAt: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
