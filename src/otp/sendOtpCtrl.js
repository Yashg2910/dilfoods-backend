import {OtpModel} from "./otpsModel.js";

export const sendOtpCtrl = {

  create: async (req, res) => {
    const {phone} = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);

    const otpModel = OtpModel({
      phone,
      otp,
      expiry: Date.now() + 60000 // 1 minute expiry
    });

    try {
      await otpModel.save();
      console.log("OTP-----------------", otp);
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (e) {
      console.error(error);
      res.status(500).json({ message: 'Error sending OTP' });
    }
  },
}

