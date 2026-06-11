"use server";
import mongoose from "mongoose";

export async function connect(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connect;