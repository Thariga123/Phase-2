import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { skills, timezone, goals, name } = req.body;

  // Always convert skills to array
  const formattedSkills = Array.isArray(skills)
    ? skills
    : skills.split(",").map((s) => s.trim()).filter(Boolean);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      skills: formattedSkills,
      timezone,
      goals,
    },
    { new: true }
  ).select("-password");

  res.json(user);
};
