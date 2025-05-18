import mongoose from "mongoose"
const UserInfo = new mongoose.Schema(
    {
        fullName : String,
        heroTitle : String,
        profession : String,
        bio : String,
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

   const Info = mongoose.models.info||mongoose.model('userInfo', UserInfo);
   export default Info;
