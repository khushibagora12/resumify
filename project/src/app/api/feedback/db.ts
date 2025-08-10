import mongoose from "mongoose";

const Userfeedbackschema = new mongoose.Schema({
    rating : Number,
    feedback : String
})

const UserFeedback = (global as any).UserFeedbackModel || mongoose.models.UserFeedback || mongoose.model("userFeedback", Userfeedbackschema);
console.log("UserFeedback model loaded:", UserFeedback.modelName);

if (!(global as any).UserFeedbackModel) {
  (global as any).UserFeedbackModel = UserFeedback;
}
export default UserFeedback;