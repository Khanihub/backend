import Interest from "../model/Interest.js"
import Match from "../model/Match.js"

// SEND INTEREST
export const sendInterest = async (req, res) => {
  const { to } = req.body

  const already = await Interest.findOne({
    from: req.user.id,
    to
  })
  if (already) {
    return res.status(400).json({ message: "Interest already sent" })
  }

  const interest = await Interest.create({
    from: req.user.id,
    to
  })

  res.status(201).json(interest)
}

// ACCEPT INTEREST
export const acceptInterest = async (req, res) => {
  const interest = await Interest.findById(req.params.id)

  if (!interest || interest.to.toString() !== req.user.id) {
    return res.status(404).json({ message: "Interest not found" })
  }

  interest.status = "accepted"
  await interest.save()

  // CREATE MATCH
  const match = await Match.create({
    users: [interest.from, interest.to]
  })

  res.json({ match })
}
