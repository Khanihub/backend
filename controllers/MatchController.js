import Match from "../model/Match.js";
import User from "../model/User.js";

// Get all matches for current user
export const getMyMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      users: { $in: [req.user.id] }
    })
      .populate("users", "name age image profession city") // populate other user info
      .lean();

    // Add `interestSent` flag for frontend
    const formatted = matches.map(match => {
      const otherUser = match.users.find(u => u._id.toString() !== req.user.id);
      return {
        ...match,
        interestSent: match.interestSentBy.includes(req.user.id),
        otherUser
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};

// Send interest to another user
export const sendInterest = async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.userId;

  try {
    let match = await Match.findOne({
      users: { $all: [senderId, receiverId] }
    });

    if (!match) {
      match = await Match.create({
        users: [senderId, receiverId],
        interestSentBy: [senderId],
      });
    } else if (!match.interestSentBy.includes(senderId)) {
      match.interestSentBy.push(senderId);
      await match.save();
    }
    await match.populate("users", "name age image profession city");

    res.json({
      ...match.toObject(),
      interestSent: match.interestSentBy.includes(senderId)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
