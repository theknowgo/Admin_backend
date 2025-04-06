import User from "../models/User.js";

// POST /create-localmate
export const createLocalmate = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber } = req.body;

    if (!firstName || !lastName || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (contactNumber.length != 10) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    if (!/^[6-9]\d{9}$/.test(contactNumber)) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    const exists = await User.findOne({ contactNumber });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!imageUrl) {
      return res.status(400).json(createResponse(false, "No image uploaded"));
    }

    const newUser = new User({
      firstName,
      lastName,
      contactNumber,
      userType: "Localmate",
      is18plus: true,
      status: "inactive",
      userPFP: imageUrl,
    });

    await newUser.save();
    res.status(201).json({ message: "Localmate created", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET /localmates
export const getAllLocalmates = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Convert to numbers and validate
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      return res.status(400).json({ message: "Invalid page or limit value" });
    }

    const users = await User.find({ userType: "Localmate" })
      .limit(limitNumber * 1)
      .skip((pageNumber - 1) * limitNumber)
      .exec();

    const count = await User.countDocuments({ userType: "Localmate" });

    res.status(200).json({
      users,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// PATCH /ban/:id
export const banLocalmate = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        $inc: { banCount: 1 },
        banExpiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        status: "inactive",
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User banned", user });
  } catch (err) {
    res.status(500).json({ message: "Error banning user" });
  }
};

// DELETE /delete/:id
export const deleteLocalmate = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
