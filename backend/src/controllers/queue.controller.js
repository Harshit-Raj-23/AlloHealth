import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Queue } from "../models/queue.model.js";


// Add patient to queue
const addToQueue = asyncHandler(async (req, res) => {
    const queueEntry = await Queue.create(req.body);

    return res
           .status(201)
           .json(
                new ApiResponse(
                    201,
                    queueEntry,
                    "Patient added to queue"
                )
           );
});


// Get queue list
const getQueue = asyncHandler(async (req, res) => {
    const queue = await Queue.find()
                             .populate(
                                "patient assignedDoctor"
                             )
                             .sort({
                                createdAt: 1
                             });

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    queue
                )
           );
});

// Update queue status (waiting, with_doctor, completed, cancelled)
const updateQueue = asyncHandler(async (req, res) => {
    const queueEntry = await Queue.findByIdAndUpdate(
        req.params.id,
        {
            $set: { status: req.body.status }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!queueEntry) {
        throw new ApiError(404, "Queue entry not found");
    }

    return res
           .status(200)
           .json(
                new ApiResponse(
                    200,
                    queueEntry,
                    "Queue updated"
                )
           );
});


export {
    addToQueue,
    getQueue,
    updateQueue
}