import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in .env files');
  }
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(uri);
}

// We'll reimplement the Admin model creation here to avoid module resolution headers/dependency issues
// when running via simple 'node scripts/create-admin.js'
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

adminSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function createAdmin() {
  try {
    await connectDB();
    console.log('Connected to database');

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error('ERROR: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env or .env.local');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: adminUsername });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    // Note: The pre-save hook handles hashing
    await Admin.create({
      username: adminUsername,
      password: adminPassword, 
    });

    console.log('Admin user created successfully!');
    console.log('Username:', adminUsername);
    
    // Disconnect to exit cleanly
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
