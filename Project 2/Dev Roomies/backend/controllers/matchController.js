import mongoose from "mongoose";
import User from "../models/User.js";

export const getMatches = async (req, res) => {
  const currentUser = await User.findById(req.user._id);

  const matches = await User.find({
    _id: { $ne: new mongoose.Types.ObjectId(currentUser._id) },
    skills: { $elemMatch: { $in: currentUser.skills } },
  }).select("-password");

  res.json(matches);
};
