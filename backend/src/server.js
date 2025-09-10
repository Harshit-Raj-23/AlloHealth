import dotenv from "dotenv";
import connectDB from './db/db.js';
import app from "./app.js";

dotenv.config({
    path: "./.env"
});

await connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);    
});