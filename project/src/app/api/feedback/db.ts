import mongoose from "mongoose";

const Userfeedbackschema = new mongoose.Schema({
    rating : Number,
    feedback : String
})

const UserFeedback = mongoose.models.userFeedbacks || mongoose.model("userFeedbacks", Userfeedbackschema);
console.log("UserFeedback model loaded:", UserFeedback.modelName);

export default UserFeedback;