import mongoose from "mongoose";
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  otp: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  expiry: {
    type: Number,
    required: true
  }
},
{
  timestamps: true
});

export const OtpModel = mongoose.model('Otps', otpSchema);
