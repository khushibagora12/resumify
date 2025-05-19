import mongoose, { Schema, models, model } from "mongoose";
const userInfoSchema = new mongoose.Schema(
    {
        fullName : String,
        profession : String,
        email : String,
        contact : String,
        about : String,
        technicalSkills : [String],
        nontechnicalSkills : [String],
        school10 : String,
        board10 : String,
        percentage10 : Number,
        school12 : String,
        board12 : String,
        percentage12 : Number,
        college : String,
        degree : String,
        cgpa : Number,
        startYear : Number,
        endYear : Number,
        certificates : [
            {
                certName : String,
                file: Buffer    
            }
        ]
    });

   const Info = mongoose.models.user||mongoose.model('usersInfo', userInfoSchema );
   export default Info;
