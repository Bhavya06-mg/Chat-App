// resetGuestPassword.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/userModel"); // Adjust path if needed

async function resetGuestPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash("123456", 10);

    const result = await User.updateOne(
      { email: "guest@example.com" }, // change email if your guest user has a different one
      { $set: { password: hashedPassword } }
    );

    console.log("Password reset result:", result);
    process.exit();
  } catch (error) {
    console.error("Error resetting password:", error);
    process.exit(1);
  }
}

resetGuestPassword();
