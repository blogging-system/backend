import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

export default mongoose;
