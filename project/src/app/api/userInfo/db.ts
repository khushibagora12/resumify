import mongoose from "mongoose";
const userInfoSchema = new mongoose.Schema(
    {
        id : String,
        fullName : String,
        profession : String,
        email : String,
        contact : String,
        about : String,
        socials: [
            {
                platform : String,
                link : String
            }
        ],
        technicalSkills : [String],
        nontechnicalSkills : [String],
        hobbies : [String],
        projects : [
            {
                name : String,
                repo : String
            }
        ],
        experience : [
            {
            position : String,
            company : String,
            startMonthExp : String,
            startYearExp : Number,
            endMonthExp : String,
            endYearExp : Number,
            description : String,
            }
        ],
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
                file: String    
            }
        ],
        languages : [String]
    });

   const Info = mongoose.models.userInfos || mongoose.model('userInfos', userInfoSchema );
   export default Info;
