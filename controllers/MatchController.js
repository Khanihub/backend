import Match from "../model/Match.js"

export const getMyMatches = async (req, res) => {
  const matches = await Match.find({
    users: req.user.id
  }).populate("users", "name")

  res.json(matches)
}
