import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { options } from "../constants.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });
    
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}


const loginUser = asyncHandler( async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new ApiError(400, "All credentials required");
    }
    
    const user = await User.findOne({username});

    if (!user) {
        throw new ApiError(404, "User does not exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
           .status(200)
           .cookie("accessToken", accessToken, options)
           .cookie("refreshToken", refreshToken, options)
           .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser,
                        accessToken,
                        refreshToken
                    },
                    "User Logged In Successfully"
                )
           );
});


const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1  // this removes the field from document
            }
        },
        {
            new: true
        }
    );

    return res
           .status(200)
           .clearCookie("accessToken", options)
           .clearCookie("refreshToken", options)
           .json(
                new ApiResponse(
                    200,
                    {},
                    "User Logged Out"
                )
           );
});


const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    
        const user = await User.findById(decodedToken?._id);
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    
        return res
               .status(200)
               .cookie("accessToken", accessToken, options)
               .cookie("refreshToken", refreshToken, options)
               .json(
                    new ApiResponse(
                        200,
                        {
                            accessToken,
                            refreshToken
                        },
                        "Access token refreshed"
                    )
               );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});


export {
    loginUser,
    logoutUser,
    refreshAccessToken
};