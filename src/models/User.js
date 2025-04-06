import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  is18plus: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    enum: ["Customer", "Localmate"],
  },
  contactNumber: {
    type: String, // Changed from Number to String
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[6-9]\d{9}$/.test(v),
      message: (props) =>
        `${props.value} is not a valid Indian contact number!`,
    },
  },
  banCount: { type: Number, default: 0 },
  banExpiration: { type: Date, default: null },
  isPermanentlyBanned: { type: Boolean, default: false },
  defaultAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAddress",
  },
  userPFP: { type: String },
  status: {
    type: String,
    enum: ["active", "inactive", "online"],
    default: "inactive",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
