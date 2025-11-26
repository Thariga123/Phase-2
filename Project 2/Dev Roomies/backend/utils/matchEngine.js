import User from '../models/User.js';

export const findMatches = async (user) => {
  const matches = await User.find({
    _id: { $ne: user._id },
    isActive: true,
    skills: { $in: user.skills },
    timezone: user.timezone,
  })
    .select('-password')
    .limit(10);
  
  return matches;
};