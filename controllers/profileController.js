import Profile from "../model/Profie.js"

export const createProfile = async (req, res) => {
  try {
    const already = await Profile.findOne({ user: req.user.id })
    if (already) {
      return res.status(400).json({ message: "Profile already exists" })
    }

    const profile = await Profile.create({
      ...req.body,
      user: req.user.id,
      image: req.file ? `/uploads/${req.file.filename}` : ""
    })

    res.status(201).json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }
    res.json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE PROFILE (WITH IMAGE SUPPORT)
export const updateProfile = async (req, res) => {
  try {
    const updatedData = { ...req.body }

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      updatedData,
      { new: true }
    )

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET APPROVED PROFILES
export const getApprovedProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ status: "approved" }).populate(
      "user",
      "name"
    )
    res.json(profiles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProfileStatus = async (req, res) => {
  try {
    const { status } = req.body

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" })
    }

    res.json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.user.id })
    if (!profile) return res.status(404).json({ message: "Profile not found" })

    res.json({ message: "Account deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}