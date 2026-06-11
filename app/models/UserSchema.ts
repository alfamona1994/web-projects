import mongoose, { Document, Schema } from "mongoose";
const userSchema = new mongoose.Schema(
    {
        clerkUserId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
