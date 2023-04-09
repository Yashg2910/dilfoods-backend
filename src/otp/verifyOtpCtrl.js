import {OtpModel} from "./otpsModel.js";
import {UsersModel} from "../users/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "../authentication/jwt.js";

export const verifyOtpCtrl = {

  create: async (req, res) => {
    const {otp, phone} = req.body;

    try {
      const queryRes = await OtpModel.find({phone}).sort({createdAt: -1});
      if (queryRes.length >= 1) {
        if (queryRes[0].otp === otp) {
          if (queryRes[0].expiry < Date.now()) {
            res.status(401).json({ message: 'OTP expired. Please try again.' });
            return;
          }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash("password123", salt);
          const user = {
            name: `New Account user- ${Date.now()}`,
            email: `newAccount-${Date.now()}@samplemail.com`,
            phone,
            password: hashedPassword,
            role: "CUSTOMER"
          }
          const newUser = UsersModel(user);
          const newlyCreatedUser = await newUser.save();

          const token = jwt.generateToken({ _id: newlyCreatedUser._id, name: newlyCreatedUser.name, role: newlyCreatedUser.role }, '1h');
          delete newlyCreatedUser.password;
          res.status(200).json({ user: newlyCreatedUser, token, message: 'OTP verified successfully' });
        } else {
          res.status(401).json({ message: 'Invalid OTP' });
        }
      } else {
        res.status(500).json({ message: `No OTP found for the number: ${phone}` });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Error Verifying OTP' });
    }

  },
}

