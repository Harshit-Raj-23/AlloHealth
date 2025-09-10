import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,  // will be hashed
            required: true
        },
        role: {
            type: String,
            enum: ["frontdesk", "admin"],
            default: "frontdesk"
        }
    },
    {
        timestamps: true
    }
);


// Hashing password before saving 
userSchema.pre("save", async (next) => {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// Creating method isPasswordCorrect
userSchema.methods.isPasswordCorrect() = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Creating method generateAccessToken
userSchema.methods.generateAccessToken = async () => {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};


// Creating method generateRefreshToken
userSchema.methods.generateRefreshToken =async () => {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);