import { playfair, poppins } from "@/components/ui/fonts"
import { Link } from 'lucide-react';

interface AllData {
    fullName: string,
    profession: string,
    email: string,
    contact: string,
    about: string,
    socials: [{ platform: string, link: string }],
    technicalSkills: [string],
    nontechnicalSkills: [string],
    hobbies: [string],
    projects: [{ name: string, repo: string }],
    experience: [
        {
            position: string,
            company: string,
            startMonthExp: string,
            startYearExp: string,
            endMonthExp: string,
            endYearExp: string,
            description: string,
        }
    ],
    school10: string,
    board10: string,
    percentage10: string,
    school12: string,
    board12: string,
    percentage12: string,
    college: string,
    degree: string,
    cgpa: string,
    startYear: string,
    endYear: string,
    certificates: [{ certName: string, file: string }],
    languages: [string]
}
interface Projects {
    name: string,
    html_url: string
}
interface Social {
    platform: string,
    link: string
}
interface Cert {
    certName: string,
    url: string
}
interface Exp {
    position: string,
    company: string,
    startMonthExp: string,
    startYearExp: number,
    endMonthExp: string,
    endYearExp: number,
    description: string,
}
interface ResumeData {
    data: AllData
}
export default function ResumeTemplate1({data}: ResumeData) {
    const allData = data;
    console.log("allll", allData)
    return (
        <>
            <div className="m-10 max-w-[700px] h-auto">
                <div className=" h-auto border-1 border-gray-400 w-full grid grid-cols-[60%_40%] sm:grid-cols-[70%_30%] md:grid-cols-[70%_30%] overflow-clip">
                    <div className="grid md:grid-rows-[auto_auto] h-auto">
                        {/* header */}
                        <div className="bg-gray-300 grid grid-cols-2 items-center">
                            <div className={`${playfair.className} ml-5 p-5`}>
                                <p className="text-2xl sm:text-4xl font-bold w-40 sm:w-70">{allData ? allData.fullName : "John Doe"}</p>
                                <p className="text-sm sm:text-lg">{allData ? allData.profession : "Software Engineer"}</p>
                            </div>
                        </div>
                        {/* body  */}
                        <div className="">
                            {/* about */}
                            <div className="p-5">
                                <h3 className={`${poppins.className} text-sm md:text-lg font-bold`}>ABOUT: </h3>
                                <p className="text-xs sm:text-sm">{allData ? allData.about : "se this area to say something about yourself or describe your goals. "}</p>
                            </div>
                            {/* projects */}
                            <div className="p-5">
                                <h3 className={`${poppins.className} text-sm md:text-lg font-bold`}>PROJECTS: </h3>
                                <div className="text-xs sm:text-sm">
                                    {
                                        allData ? allData.projects?.map((pr , index: number) => (
                                            <div key={index} className="flex">
                                                <li>{pr["name"]}</li>
                                                <div className="font-medium underline"><a href={pr['repo']} target="_blank" className="text-blue-600"><Link size={12} className="m-1" /></a></div>
                                            </div>
                                        ))
                                            : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga rerum ducimus, ab perferendis excepturi repudiandae eligendi aspernatur illo necessitatibus architecto similique et laborum, blanditiis vitae odit facere maxime recusandae dolor."
                                    }
                                </div>
                            </div>
                            {/* experience */}
                            <div className="p-5">
                                <h3 className={`${poppins.className}  text-sm sm:text-lg font-bold`}>EXPERIENCE: </h3>
                                <div className="text-xs md:text-sm">
                                    {/* {
                                        allData.experience?.map((ex, index: number) => (
                                            <div key={index}>
                                                <div className="font-semibold">{ex.position}</div>
                                                <div>{ex.company} | {ex.startMonthExp}/{ex.startYearExp}-{ex.endMonthExp}/{ex.endYearExp}</div>
                                                <li>{ex.description}</li>
                                            </div>
                                        ))
                                    } */}
                                </div>
                            </div>
                            {/* education */}
                            <div className="m-5">
                                <h3 className={`${poppins.className}  text-sm sm:text-lg font-bold`}>EDUCATION: </h3>
                                <div className="text-xs sm:text-sm">
                                    {
                                        <div className="grid gap-5">
                                            <div>
                                                <h3 className="font-semibold">{allData.degree}</h3>
                                                <p>{allData.college}</p>
                                                <p className="text-xs ">CGPA: {allData.cgpa} | {allData.startYear}-{allData.endYear}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">Senior Secondary (Class XII)</h3>
                                                <p>{allData.school10}, {allData.board10}</p>
                                                <p className="text-xs ">{allData.percentage10}%</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">Secondary (Class X)</h3>
                                                <p>{allData.school12}, {allData.board12}</p>
                                                <p className="text-xs ">{allData.percentage12}%</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* rightside div */}
                    <div className="h-auto bg-[#021526] flex justify-end items-stretch">
                        <div className="m-auto mt-10 w-full">
                            {/* contact */}
                            <div className="p-5 text-white">
                                <h3 className={`${poppins.className} text-sm sm:text-lg font-bold`}>DETAILS: </h3>
                                <div className="text-xs md:text-sm">Phone : {allData ? allData.contact : "1234567890"}</div>
                                <div className="text-xs md:text-sm">{allData ? allData.email : "dummy@gmail.com"}</div>
                            </div>
                            {/* skills */}
                            <div className="p-5 text-white">
                                <h3 className={`${poppins.className} text-sm sm:text-lg font-bold`}>SKILLS: </h3>
                                <div className="text-xs md:text-sm">Technical :
                                    {
                                        allData ?
                                            allData.technicalSkills?.map((skill: string, index: number) => (
                                                <div key={index} className="text-xs sm:text-md">
                                                    <li>{skill}</li>
                                                </div>
                                            ))
                                            :
                                            <div className="text-xs sm:text-md">
                                                <li>skill 1</li>
                                                <li>skill 2</li>
                                            </div>
                                    }
                                </div>
                                <div className="text-xs md:text-sm">Non-technical:
                                    {
                                        allData ?
                                            allData.nontechnicalSkills?.map((skill: string, index: number) => (
                                                <div key={index} className="text-xs sm:text-md" >
                                                    <li>{skill}</li>
                                                </div>
                                            ))
                                            :
                                            <div className="text-xs sm:text-md">
                                                <li>skill 1</li>
                                                <li>skill 2</li>
                                            </div>
                                    }
                                </div>
                            </div>
                            {/* socials */}
                            <div className="p-5 text-white">
                                <h3 className={`${poppins.className} text-sm md:text-lg font-bold`}>SOCIALS: </h3>
                                {
                                    allData ?
                                        allData.socials?.map((soc: Social, index: number) => (
                                            <div key={index} className="text-xs sm:text-md flex" >
                                                <li>{soc.platform}</li>
                                                <a href={soc.link} target="_blank" className="underline text-blue-500"><Link size={12} className="m-1" /></a>
                                            </div>
                                        ))
                                        :
                                        <div className="text-xs md:text-md">
                                            <li>name : id</li>
                                            <li>name : id</li>
                                        </div>
                                }
                            </div>
                            {/* hobbies */}
                            <div className="p-5 text-white">
                                <h3 className={`${poppins.className} text-sm sm:text-lg font-bold`}>HOBBIES: </h3>
                                {allData ?
                                    allData.hobbies?.map((hobby: string, index: number) =>
                                    (
                                        <li className="text-xs sm:text-md" key={index}>{hobby}</li>
                                    ))
                                    :
                                    <div className="text-xs md:text-md">
                                        <li>hooby 1</li>
                                        <li>hobby 2</li>
                                    </div>}
                            </div>
                            {/* certificates */}
                            <div className="p-5 text-white">
                                <h3 className={`${poppins.className} text-sm sm:text-lg font-bold`}>CERTIFICATES: </h3>
                                {
                                    allData ?
                                        allData.certificates?.map((cert, index: number) => (
                                            <div key={index} className="text-xs sm:text-md">
                                                <li className="flex">{cert["certName"]}<a className="text-blue-500 underline" target="_blank" href={cert["file"]}><Link size={12} className="m-1" /></a></li>
                                            </div>
                                        ))
                                        :
                                        <div className="text-xs sm:text-md">
                                            <li>cert1 : link</li>
                                            <li>cert 2 : link</li>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}