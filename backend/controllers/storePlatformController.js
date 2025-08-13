import User from "../models/User.js";

export const storePlatforms = async (req, res) => {
  const platforms = req.body.platforms; // fix: get from req.body
  console.log("Platforms to add:", platforms);

  const userId = req.user.userId; // comes from isAuthorized middleware

  try {
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { selectedPlatforms: { $each: platforms } } },
      { new: true }
    );

    res.status(200).json({ message: "Platforms updated successfully" });
  } catch (error) {
    console.log("Error updating platform preference:", error);
    res.status(500).json({ message: "Error updating platforms", error: error.message });
  }
};
