import Profile from "../model/Profile.js";

// CREATE PROFILE
export const createProfile = async (req, res) => {
  try {
    console.log('Create profile request body:', req.body);
    
    const exists = await Profile.findOne({ user: req.user.id });
    if (exists) return res.status(400).json({ message: "Profile already exists" });

    // Process data
    const profileData = {
      ...req.body,
      user: req.user.id,
      age: req.body.age ? Number(req.body.age) : undefined,
      height: req.body.height ? Number(req.body.height) : null,
      isMuslim: req.body.isMuslim === "true" || req.body.isMuslim === true,
      interests: req.body.interests ? 
        (typeof req.body.interests === 'string' ? 
          req.body.interests.split(',').map(i => i.trim()) : 
          req.body.interests) : []
    };

    if (req.file) profileData.image = `/uploads/${req.file.filename}`;

    // Check required fields
    const requiredFields = ['fullName', 'gender', 'age', 'city', 'education'];
    for (const field of requiredFields) {
      if (!profileData[field] && profileData[field] !== 0) {
        return res.status(400).json({ 
          message: `${field} is required`,
          field: field 
        });
      }
    }

    const profile = await Profile.create(profileData);
    res.status(201).json(profile);
  } catch (err) {
    console.error("Create Profile Error:", err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors: messages 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

// GET MY PROFILE
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    console.log('Update profile request body:', req.body);
    console.log('File received:', req.file);

    // Process data
    const updatedData = {
      ...req.body,
      age: req.body.age ? Number(req.body.age) : undefined,
      height: req.body.height ? Number(req.body.height) : null,
      isMuslim: req.body.isMuslim === "true" || req.body.isMuslim === true,
      interests: req.body.interests ? 
        (typeof req.body.interests === 'string' ? 
          req.body.interests.split(',').map(i => i.trim()) : 
          req.body.interests) : []
    };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    // Check required fields
    const requiredFields = ['fullName', 'gender', 'age', 'city', 'education'];
    for (const field of requiredFields) {
      if (!updatedData[field] && updatedData[field] !== 0) {
        return res.status(400).json({ 
          message: `${field} is required`,
          field: field 
        });
      }
    }

    // Check if profile exists
    let profile = await Profile.findOne({ user: req.user.id });
    
    if (!profile) {
      // Create new profile if doesn't exist (for PUT /me)
      profile = await Profile.create({
        ...updatedData,
        user: req.user.id
      });
      return res.status(201).json(profile);
    }

    // Update existing profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      updatedData,
      { new: true, runValidators: true }
    );

    res.json(profile);
  } catch (err) {
    console.error("Update Profile Error:", err);
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ 
        message: 'Validation Error', 
        errors: messages 
      });
    }
    
    // Other errors
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

// DELETE PROFILE
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET APPROVED PROFILES
export const getApprovedProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ status: "approved" }).populate("user", "name");
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: update profile status
export const updateProfileStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};