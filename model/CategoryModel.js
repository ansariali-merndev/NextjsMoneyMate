import mongoose from "mongoose";

const requiredString = { type: String, required: true };

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userEmail: requiredString,
  categories: [
    {
      name: requiredString,
      emoji: requiredString,
      type: requiredString,
    },
  ],
});

export const categoryDB =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
