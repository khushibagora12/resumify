import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id : String,
    resumePdf : {
        type : String,
        required : true
    }
})

const MyRes = mongoose.models.myResumes || mongoose.model("myResumes", schema);

export default MyRes;