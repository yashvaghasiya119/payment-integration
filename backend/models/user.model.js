const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    ispaid:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
