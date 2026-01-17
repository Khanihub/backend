import Profile from "../model/Profile.js";

// CREATE
export const createProfile = async (req, res) => {
  try {
    const exists = await Profile.findOne({ user: req.user.id });
    if (exists) return res.status(400).json({ message: "Profile already exists" });

    const profileData = {
      user: req.user.id,
      fullName: req.body.fullName,
      gender: req.body.gender,
      age: parseInt(req.body.age),
      isMuslim: req.body.isMuslim === "true" || req.body.isMuslim === true,
      sect: req.body.sect || "",
      city: req.body.city,
      education: req.body.education,
      profession: req.body.profession || "",
      about: req.body.about || "",
      interests: req.body.interests
        ? req.body.interests.split(",").map(i => i.trim())
        : [],
      height: req.body.height ? parseInt(req.body.height) : null
    };

    if (req.file) profileData.image = `/uploads/${req.file.filename}`;

    const profile = await Profile.create(profileData);
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateProfile = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      age: parseInt(req.body.age),
      isMuslim: req.body.isMuslim === "true" || req.body.isMuslim === true,
      interests: req.body.interests
        ? req.body.interests.split(",").map(i => i.trim())
        : []
    };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

// DELETE
export const deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// APPROVED
export const getApprovedProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ status: "approved" });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN STATUS UPDATE
export const updateProfileStatus = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
