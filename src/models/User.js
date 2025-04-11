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
    required: true,
    enum: ["Customer", "Localmate"],
  },
  contactNumber: {
    type: String,
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
  userPFP: { type: String },
  status: {
    type: String,
    enum: ["active", "inactive", "online"],
    default: "inactive",
  },
  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
