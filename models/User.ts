import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
    {
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        avatar: {
            type: String,
            default: "/logo-giay.jpg"
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true
        },
        status: { type: String, required: true, default: "active" },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;
