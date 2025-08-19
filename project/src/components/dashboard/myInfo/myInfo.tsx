'use client'
import { useEffect, useState } from "react"
import { SquarePen, SquareCheckBig } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";

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
interface Cert {
    certName: string,
    file: string
}
interface Exp {
    position: string,
    company: string,
    startMonthExp: string,
    startYearExp: string,
    endMonthExp: string,
    endYearExp: string,
    description: string,
}
interface Soc {
    platform: string,
    link: string
}
export default function MyInfoPage() {
    const [allData, setAllData] = useState<AllData>();
    const [edit, setEdit] = useState(0)
    //basic info---------------------------------------
    const [info, setInfo] = useState<{
        fullName: string,
        profession: string,
        contact: string,
        email: string,
        about: string
    }>({
        fullName: '',
        profession: '',
        contact: '',

        email: '',
        about: ''
    })
    //socials--------------------------------------------
    const [platform, setPlatform] = useState('')
    const [link, setLink] = useState('')
    const [socials, setSocials] = useState<Soc[]>([])
    //skills----------------------------------------------
    const [Tskills, setTSkills] = useState<string[]>([]);
    const [Tinput, setTInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [input, setInput] = useState('');
    //hobbies----------------------------------------------
    const [hobby, setHobby] = useState('')
    const [hobbyArr, setHobbyArr] = useState<string[]>([])
    //projects---------------------------------------------------------------------------
    const [allProjects, setAllProjects] = useState([])
    const [username, setUsername] = useState({ username: '' })
    const [projects, setProjects] = useState<object[]>([])
    //experience-----------------------------------------------------------------------
    const [exp, setExp] = useState<Exp>({
        position: "",
        company: "",
        startMonthExp: "",
        startYearExp: "",
        endMonthExp: "",
        endYearExp: "",
        description: "",
    })
    const [experience, setExperience] = useState<Exp[]>([])
    //education-------------------------------------------------------------------------
    const [education, setEducation] = useState<{
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
    }>({
        school10: "",
        board10: "",
        percentage10: "",
        school12: "",
        board12: "",
        percentage12: "",
        college: "",
        degree: "",
        cgpa: "",
        startYear: "",
        endYear: "",
    })
    //certificates------------------------------------------------------------------
    const [pdf, setPdf] = useState<File | null>(null);
    const [pdfArr, setPdfArr] = useState<File[]>([]);
    const [certName, setCertName] = useState('');
    const [certArr, setCertArr] = useState<string[]>([]);
    const [fullcertificates, setfullcertificates] = useState<Cert[]>([]);
    const [certificates, setCertificates] = useState<object[]>([])
    //languages----------------------------------------------------------------------
    const [language, setLanguage] = useState('')
    const [langArr, setLangArr] = useState<string[]>([])

    //function to get user info from database==================================================================================================
    const getInfo = async () => {
        try {
            const res = await fetch('/api/userInfo', {
                method: "GET"
            })
            const result = await res.json();
            console.log("myInfo: ", result)
            setAllData(result)
        } catch (error: unknown) {
            console.log("error in fetching user data in myInfo: ", error);
        }
    }
    useEffect(() => { getInfo() }, [])

    //function to update values in database if user edits any fiels============================================================================
    const editHandler = async (key: string, val: unknown) => {
        const data = {
            [key]: val
        }
        console.log("data", data)
        try {
            const res = await fetch('/api/userInfo', {
                method: "PATCH",
                body: JSON.stringify(data)
            })
            const result = await res.json();
            toast("field updated")
            console.log(result)
            getInfo()
        }
        catch (error: unknown) {
            console.log("error in updating form: ", error)
        }
    }
    //function to get project name and repo from github=====================================================================================
    const getProjects = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/autoFetchGithub', {
            method: "POST",
            body: JSON.stringify(username)
        })
        const projectsRes = await res.json()
        console.log(res)
        console.log(projectsRes)
        setAllProjects(projectsRes)
    }
    useEffect(() => {
        for (let i = 0; i < allProjects.length; i++) {
            console.log(allProjects[i]["name"], " ", allProjects[i]["html_url"])
            setProjects(prev => [...prev, { name: allProjects[i]["name"], repo: allProjects[i]["html_url"] }])
        }
    }, [allProjects])
    //function to add certificate==============================================================================================================
    async function handleAddFile() {
        if (pdf !== null && certName !== '') {
            setPdfArr([...pdfArr, pdf]);
            setCertArr([...certArr, certName])
            setCertificates([...certificates, { certName: certName, file: pdf }])
            const formdata = new FormData();
            formdata.append("file", pdf);
            formdata.append("upload_preset", "certificates")
            const res = await fetch(`https://api.cloudinary.com/v1_1/dmkwymeim/upload`, {
                method: 'POST',
                body: formdata
            })
            const result = await res.json();
            setfullcertificates([...fullcertificates, { certName: certName, file: result.secure_url }])
            // console.log(fullcertificates)
            console.log(result)
            setPdf(null);
            setCertName('');
        }
    }
    return (
        <>
            <h1 className="text-3xl font-bold m-10">My Information</h1>
            <div className="m-10">
                {
                    <div>
                        {/* basic Info section======================================================================================================================= */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Basic Info</h1>
                            <div className="grid sm:grid-cols-2 gap-y-3">
                                <div>
                                    Name:
                                    <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 1 ? 'flex' : 'hidden'}`}>
                                        {allData?.fullName}
                                        <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(1) }} />
                                    </div>
                                    <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 1 ? 'flex' : 'hidden'}`}>
                                        <input type="text" placeholder="Full Name" className="focus:outline-none"
                                            value={info.fullName}
                                            onChange={(e) => { setInfo({ ...info, fullName: e.target.value }) }}
                                        />
                                        <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                            if (info.fullName !== '') {
                                                editHandler('fullName', info.fullName)
                                            }
                                            setEdit(0)
                                            setInfo({ ...info, fullName: '' })

                                        }} />
                                    </div>
                                </div>
                                <div>
                                    Profession:
                                    <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 2 ? 'flex' : 'hidden'}`}>
                                        {allData?.profession}
                                        <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(2) }} />
                                    </div>
                                    <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 2 ? 'flex' : 'hidden'}`}>
                                        <input type="text" placeholder="Full Name" className="focus:outline-none"
                                            value={info.fullName}
                                            onChange={(e) => { setInfo({ ...info, profession: e.target.value }) }}
                                        />
                                        <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                            if (info.profession !== '') {
                                                editHandler('profession', info.profession)
                                            }
                                            setEdit(0)
                                            setInfo({ ...info, profession: '' })

                                        }} />
                                    </div>
                                </div>
                                <div>
                                    Email:
                                    <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 3 ? 'flex' : 'hidden'}`}>
                                        {allData?.email}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(3) }} />
                                    </div>
                                    <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 3 ? 'flex' : 'hidden'}`}>
                                        <input type="text" placeholder="Email" className="focus:outline-none"
                                            value={info.email}
                                            onChange={(e) => { setInfo({ ...info, email: e.target.value }) }}
                                        />
                                        <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                            if (info.email !== '') {
                                                editHandler('email', info.email)
                                            }
                                            setEdit(0)
                                            setInfo({ ...info, email: '' })

                                        }} />
                                    </div>

                                </div>
                                <div>
                                    Contact:
                                    <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 4 ? 'flex' : 'hidden'}`}>
                                        {allData?.contact}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(4) }} />
                                    </div>
                                    <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 4 ? 'flex' : 'hidden'}`}>
                                        <input type="text" placeholder="Contact" className="focus:outline-none"
                                            value={info.contact}
                                            onChange={(e) => { setInfo({ ...info, contact: e.target.value }) }}
                                        />
                                        <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                            if (info.contact !== '') {
                                                editHandler('contact', info.contact)
                                            }
                                            setEdit(0)
                                            setInfo({ ...info, contact: '' })

                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                About:
                                <div className={`flex bg-white p-1 rounded-xl sm:w-[72%] h-30 border-2 border-gray-300 ${edit != 5 ? 'flex' : 'hidden'}`}>
                                    {allData?.about}
                                    <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(5) }} />
                                </div>
                                <div className={`bg-white p-1 rounded-xl sm:w-[72%] h-30 border-2 border-gray-300 ${edit == 5 ? 'flex' : 'hidden'}`}>
                                    <textarea placeholder="About yourself" className="focus:outline-none w-[80%]"
                                        value={info.about}
                                        onChange={(e) => { setInfo({ ...info, about: e.target.value }) }}
                                    />
                                    <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                        if (info.about !== '') {
                                            editHandler('about', info.about)
                                        }
                                        setEdit(0)
                                        setInfo({ ...info, about: '' })

                                    }} />
                                </div>
                            </div>

                        </div>
                        {/* socials section========================================================================================================================= */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Socials</h1>
                            <div className={`bg-white sm:w-[72%] p-2 rounded-xl border-2 border-gray-300 ${edit != 6 ? '' : 'hidden'}`}>
                                <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(6) }} />
                                {allData?.socials.map((social, index) => (
                                    <div key={index} className="flex gap-x-2"><li>{social.platform}</li><div><a target="_blank" className="text-blue-600" href={social.link}>visit</a></div></div>
                                ))}
                            </div>
                            <div className={`bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit == 6 ? '' : 'hidden'}`}>
                                <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                    if (Object.keys(socials).length !== 0) {
                                        editHandler('socials', socials)
                                    }
                                    setEdit(0)
                                    setPlatform("")
                                    setLink("")

                                }} />
                                <div className="flex">
                                    <input type="text" placeholder="Social Platform" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                        value={platform}
                                        onChange={(e) => { setPlatform(e.target.value) }}
                                    />

                                    <input type="text" placeholder="URL" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                        value={link}
                                        onChange={(e) => { setLink(e.target.value) }}
                                    />
                                    <button className="border border-gray-300 p-1 rounded-xl bg-gray-100 text-gray-600 active:bg-gray-300"
                                        onClick={() => {
                                            if (platform !== '' && link !== '') {
                                                setSocials([...socials, { platform: platform, link: link }])
                                            }
                                        }}>Add</button>
                                </div>

                                <div>
                                    {socials.map((soc, index) => (
                                        <div key={index} className="flex gap-x-3"><li>{soc.platform}</li><a className="text-blue-500" target="_blank" href={soc.link}>click</a></div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        {/* skill section ========================================================================================================================== */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Skills</h1>
                            <div className="grid sm:grid-cols-2">
                                <div>
                                    <h2 className="font-bold">Techinical: </h2>
                                    <div className={`bg-white sm:w-[72%] p-2 rounded-xl border-2 border-gray-300 ${edit != 7 ? '' : 'hidden'}`}>
                                        <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(7) }} />
                                        {allData?.technicalSkills.map((Tskill, index) => (
                                            <li key={index}>{Tskill}</li>
                                        ))}
                                    </div>
                                    <div className={`bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit == 7 ? '' : 'hidden'}`}>
                                        <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                            if (Tskills.length !== 0) {
                                                editHandler('technicalSkills', Tskills)
                                            }
                                            setEdit(0)
                                            setTInput("")

                                        }} />
                                        <div className="flex">
                                            <input type="text" placeholder="Technical skills" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                                value={Tinput}
                                                onChange={(e) => { setTInput(e.target.value) }}
                                            />
                                            <button className="border border-gray-300 p-1 rounded-xl bg-gray-100 text-gray-600 active:bg-gray-300"
                                                onClick={() => {
                                                    if (Tinput !== '') {
                                                        setTSkills([...Tskills, Tinput])
                                                    }
                                                }}>Add</button>
                                        </div>

                                        <div>
                                            {Tskills.map((tskill, index) => (
                                                <div key={index} className="flex gap-x-3"><li>{tskill}</li></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-bold mt-5 sm:mt-0">Non Techinical: </h2>
                                    <div className={`bg-white sm:w-[72%] p-2 rounded-xl border-2 border-gray-300 ${edit != 8 ? '' : 'hidden'}`}>
                                        <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(8) }} />
                                        {allData?.nontechnicalSkills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </div>
                                    <div className={`bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit == 8 ? '' : 'hidden'}`}>
                                        <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                            if (skills.length !== 0) {
                                                editHandler('nontechnicalSkills', skills)
                                            }
                                            setEdit(0)
                                            setInput("")

                                        }} />
                                        <div className="flex">
                                            <input type="text" placeholder="Technical skills" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                                value={input}
                                                onChange={(e) => { setInput(e.target.value) }}
                                            />
                                            <button className="border border-gray-300 p-1 rounded-xl bg-gray-100 text-gray-600 active:bg-gray-300"
                                                onClick={() => {
                                                    if (input !== '') {
                                                        setSkills([...skills, input])
                                                    }
                                                }}>Add</button>
                                        </div>

                                        <div>
                                            {skills.map((skill, index) => (
                                                <div key={index} className="flex gap-x-3"><li>{skill}</li></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* hobbies section ======================================================================================================================== */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Hobbies</h1>
                            <div className={`bg-white sm:w-[72%] p-2 rounded-xl border-2 border-gray-300 ${edit != 9 ? '' : 'hidden'}`}>
                                <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(9) }} />
                                {allData?.hobbies.map((hobby, index) => (
                                    <li key={index}>{hobby}</li>
                                ))}
                            </div>
                            <div className={`bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit == 9 ? '' : 'hidden'}`}>
                                <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                    if (hobbyArr.length !== 0) {
                                        editHandler('hobbies', hobbyArr)
                                    }
                                    setEdit(0)
                                    setHobby("")

                                }} />
                                <div className="flex">
                                    <input type="text" placeholder="Hobbies" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                        value={hobby}
                                        onChange={(e) => { setHobby(e.target.value) }}
                                    />
                                    <button className="border border-gray-300 p-1 rounded-xl bg-gray-100 text-gray-600 active:bg-gray-300"
                                        onClick={() => {
                                            if (hobby !== '') {
                                                setHobbyArr([...hobbyArr, hobby])
                                            }
                                        }}>Add</button>
                                </div>

                                <div>
                                    {hobbyArr.map((hobby, index) => (
                                        <div key={index} className="flex gap-x-3"><li>{hobby}</li></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* projects section ====================================================================================================================== */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Projects</h1>
                            <div className={`bg-white sm:w-[72%] p-2 rounded-xl border-2 border-gray-300 ${edit != 10 ? '' : 'hidden'}`}>
                                <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(10) }} />
                                {allData?.projects.map((project, index) => (
                                    <div key={index} className="flex gap-x-2"><li>{project.name}</li><div><a target="_blank" className="text-blue-600" href={`${project.repo}`}>visit</a></div></div>
                                ))}
                            </div>
                            <div className={`bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit == 10 ? '' : 'hidden'}`}>
                                <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {

                                    console.log("projects: ", projects)
                                    if (Object.keys(allProjects).length !== 0) {
                                        editHandler('projects', projects)
                                    }
                                    setEdit(0)
                                    setLink("")

                                }} />
                                <div className="flex">
                                    <input type="text" placeholder="Github Username" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                        value={username.username}
                                        onChange={(e) => { setUsername({ username: e.target.value }) }}
                                    />
                                    <button className="border border-gray-300 p-1 rounded-xl bg-gray-100 text-gray-600 active:bg-gray-300"
                                        onClick={getProjects}>Add</button>
                                </div>

                                <div>
                                    {allProjects.map((pr, index) => (
                                        <div key={index} className="flex">
                                            <li>{pr["name"]}</li> --
                                            <div className="font-medium underline"><a href={pr['repo']} target="_blank">visit repo</a></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* experience section ===================================================================================================================== */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Experience</h1>
                            <div className="p-10 border rounded-2xl sm:w-[72%]">
                                <SquarePen className={`m-1 ml-auto ${edit != 11 ? 'flex' : 'hidden'}`} size={18} onClick={() => { setEdit(11) }} />
                                <SquareCheckBig className={`m-1 ml-auto ${edit == 11 ? 'flex' : 'hidden'}`} size={18} onClick={() => {
                                    if (experience.length != 0) {
                                        editHandler('experience', experience)
                                    }
                                    setEdit(0)
                                    setExperience([])

                                }} />
                                <div className={`${edit != 11 ? 'flex' : 'hidden'} grid sm:grid-cols-2 gap-5`}>
                                    {
                                        allData?.experience.map((ex, index) => (
                                            <div key={index}>
                                                <div className="font-bold">{ex.position}</div>
                                                <div>{ex.company} | {ex.startMonthExp}/{ex.startYearExp}-{ex.endMonthExp}/{ex.endYearExp}</div>
                                                <div>{ex.description}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={`grid sm:grid-cols-2 gap-y-5 ${edit == 11 ? 'flex' : 'hidden'}`}>
                                    <div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 11 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Position" className="focus:outline-none"
                                                value={exp.position}
                                                onChange={(e) => { setExp({ ...exp, position: e.target.value }) }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 11 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Company" className="focus:outline-none"
                                                value={exp.company}
                                                onChange={(e) => { setExp({ ...exp, company: e.target.value }) }}
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 11 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Start Month" className="focus:outline-none"
                                                value={exp.startMonthExp}
                                                onChange={(e) => { setExp({ ...exp, startMonthExp: e.target.value }) }}
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 11 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Start Year" className="focus:outline-none"
                                                value={exp.startYearExp}
                                                onChange={(e) => { setExp({ ...exp, startYearExp: e.target.value }) }}
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 11 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="End Month" className="focus:outline-none"
                                                value={exp.endMonthExp}
                                                onChange={(e) => { setExp({ ...exp, endMonthExp: e.target.value }) }}
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 11 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="End Year" className="focus:outline-none"
                                                value={exp.endYearExp}
                                                onChange={(e) => { setExp({ ...exp, endYearExp: e.target.value }) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className={`bg-white p-1 rounded-xl w-[72%] border-2 border-gray-300 ${edit == 11 ? 'flex' : 'hidden'}`}>
                                        <input type="text" placeholder="Description" className="focus:outline-none"
                                            value={exp.description}
                                            onChange={(e) => { setExp({ ...exp, description: e.target.value }) }}
                                        />

                                    </div>
                                </div>
                                <button className={`flex justify-center font-medium mt-5 border border-gray-300 p-1 rounded-xl bg-gray-400 active:bg-gray-600 w-[72%] text-black ${edit == 11 ? 'flex' : 'hidden'}`}
                                    onClick={() => {
                                        if (exp.company != '' || exp.position != '' || exp.startMonthExp != '' || exp.startYearExp != '' ||
                                            exp.endMonthExp != '' || exp.endYearExp != '' || exp.description != '') {
                                            setExperience([...experience, exp])
                                            setExp({
                                                position: "",
                                                company: "",
                                                startMonthExp: "",
                                                startYearExp: "",
                                                endMonthExp: "",
                                                endYearExp: "",
                                                description: "",
                                            })
                                        }
                                    }}>Add</button>
                                <div>
                                    {
                                        experience.map((ex, index) => (
                                            <div key={index} className="m-3">
                                                <div className="font-bold">{ex.position}</div>
                                                <div>{ex.company} | {ex.startMonthExp}/{ex.startYearExp}-{ex.endMonthExp}/{ex.endYearExp}</div>
                                                <div>{ex.description}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {/* education section ================================================================================================================================ */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Education</h1>
                            <div className="grid grid-cols-1 gap-y-5">
                                <div className="grid md:grid-cols-3">
                                    <div>
                                        School(10th):
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 18 ? 'flex' : 'hidden'}`}>
                                            {allData?.school10}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(18) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 18 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="School(10th)" className="focus:outline-none"
                                                value={education.school10}
                                                onChange={(e) => { setEducation({ ...education, school10: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.school10 !== '') {
                                                    editHandler('school10', education.school10)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, school10: '' })

                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        Board(10th):
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 19 ? 'flex' : 'hidden'}`}>
                                            {allData?.board10}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(19) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 19 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Board(10th)" className="focus:outline-none"
                                                value={education.board10}
                                                onChange={(e) => { setEducation({ ...education, board10: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.board10 !== '') {
                                                    editHandler('board10', education.board10)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, board10: '' })

                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        Percentage(10th):
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 20 ? 'flex' : 'hidden'}`}>
                                            {allData?.percentage10}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(20) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 20 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Percentage(10th)" className="focus:outline-none"
                                                value={education.percentage10}
                                                onChange={(e) => { setEducation({ ...education, percentage10: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.percentage10 !== '') {
                                                    editHandler('percentage10', education.percentage10)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, percentage10: '' })

                                            }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3">
                                    <div>
                                        School(12th):
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 21 ? 'flex' : 'hidden'}`}>
                                            {allData?.school12}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(21) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 21 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="School(12th)" className="focus:outline-none"
                                                value={education.school12}
                                                onChange={(e) => { setEducation({ ...education, school12: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.school12 !== '') {
                                                    editHandler('school12', education.school12)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, school12: '' })

                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        Board(12th):
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 22 ? 'flex' : 'hidden'}`}>
                                            {allData?.board12}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(22) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 22 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Board(12th)" className="focus:outline-none"
                                                value={education.board12}
                                                onChange={(e) => { setEducation({ ...education, board12: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.board12 !== '') {
                                                    editHandler('board12', education.board12)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, board12: '' })

                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        Percentage(12th):
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 23 ? 'flex' : 'hidden'}`}>
                                            {allData?.percentage12}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(23) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 23 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Percentage(12th)" className="focus:outline-none"
                                                value={education.percentage12}
                                                onChange={(e) => { setEducation({ ...education, percentage12: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.percentage12 !== '') {
                                                    editHandler('percentage12', education.percentage12)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, percentage12: '' })

                                            }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3">
                                    <div>
                                        College:
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 24 ? 'flex' : 'hidden'}`}>
                                            {allData?.college}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(24) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 24 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="College" className="focus:outline-none"
                                                value={education.college}
                                                onChange={(e) => { setEducation({ ...education, college: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.college !== '') {
                                                    editHandler('college', education.college)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, college: '' })

                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        Degree:
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 25 ? 'flex' : 'hidden'}`}>
                                            {allData?.degree}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(25) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 18 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="Degree" className="focus:outline-none"
                                                value={education.degree}
                                                onChange={(e) => { setEducation({ ...education, degree: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.degree !== '') {
                                                    editHandler('degree', education.degree)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, degree: '' })

                                            }} />
                                        </div>
                                    </div>
                                    <div>
                                        CGPA:
                                        <div className={`flex bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit != 26 ? 'flex' : 'hidden'}`}>
                                            {allData?.cgpa}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(26) }} />
                                        </div>
                                        <div className={`bg-white p-1 rounded-xl w-60 border-2 border-gray-300 ${edit == 18 ? 'flex' : 'hidden'}`}>
                                            <input type="text" placeholder="CGPA" className="focus:outline-none"
                                                value={education.cgpa}
                                                onChange={(e) => { setEducation({ ...education, cgpa: e.target.value }) }}
                                            />
                                            <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                                if (education.cgpa !== '') {
                                                    editHandler('cgpa', education.cgpa)
                                                }
                                                setEdit(0)
                                                setEducation({ ...education, cgpa: '' })

                                            }} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    Start Year:
                                    <div className={`flex bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit != 27 ? 'flex' : 'hidden'}`}>
                                        {allData?.startYear}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(27) }} />
                                    </div>
                                    <div className={`bg-white p-1 rounded-xl sm:w-[72%]  border-2 border-gray-300 ${edit == 27 ? 'flex' : 'hidden'}`}>
                                        <input type="text" placeholder="Start Year" className="focus:outline-none"
                                            value={education.startYear}
                                            onChange={(e) => { setEducation({ ...education, startYear: e.target.value }) }}
                                        />
                                        <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                            if (education.startYear !== '') {
                                                editHandler('startYear', education.startYear)
                                            }
                                            setEdit(0)
                                            setEducation({ ...education, startYear: '' })

                                        }} />
                                    </div>
                                </div>
                                <div>
                                    End Year:
                                    <div className={`flex bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit != 28 ? 'flex' : 'hidden'}`}>
                                        {allData?.endYear}<SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(28) }} />
                                    </div>
                                    <div className={`bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit == 28 ? 'flex' : 'hidden'}`}>
                                        <input type="text" placeholder="School(10th)" className="focus:outline-none"
                                            value={education.endYear}
                                            onChange={(e) => { setEducation({ ...education, endYear: e.target.value }) }}
                                        />
                                        <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                            if (education.endYear !== '') {
                                                editHandler('endYear', education.endYear)
                                            }
                                            setEdit(0)
                                            setEducation({ ...education, endYear: '' })

                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* certificate section ============================================================================================================ */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Certificates</h1>
                            <div className={`bg-white sm:w-[72%] p-2 rounded-xl border-2 border-gray-300 ${edit != 29 ? '' : 'hidden'}`}>
                                <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(29) }} />
                                {allData?.certificates.map((cert, index) => (
                                    <div key={index} className="flex gap-x-2"><li>{cert.certName}</li><div><a href={`${cert.file}`} target="_blank" className="text-blue-600">click</a></div></div>
                                ))}
                            </div>
                            <div className={`bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit == 29 ? '' : 'hidden'}`}>
                                <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                    if (Object.keys(fullcertificates).length !== 0) {
                                        editHandler('certificates', fullcertificates)
                                    }
                                    setEdit(0)
                                    setCertName("")
                                    setPdf(null)

                                }} />
                                <div className="flex">
                                    <input type="text" placeholder="Certificate Name" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                        value={certName}
                                        onChange={(e) => { setCertName(e.target.value) }}
                                    />

                                    <input type="file" accept="application/pdf" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            setPdf(file || null)
                                        }}
                                    />
                                    <button className="border border-gray-300 p-1 rounded-xl bg-gray-100 text-gray-600 active:bg-gray-300"
                                        onClick={handleAddFile}>Add</button>
                                </div>

                                <div>
                                    {fullcertificates.map((cert, index) => (
                                        <div key={index} className="flex gap-x-3"><li>{cert.certName}</li><a className="text-blue-500" target="_blank" href={cert.file}>click</a></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* languages section ============================================================================================================== */}
                        <div className="m-5 mb-20">
                            <h1 className="text-xl font-medium mb-5">Languages</h1>
                            <div className={`bg-white sm:w-[72%] p-2 rounded-xl border-2 border-gray-300 ${edit != 30 ? '' : 'hidden'}`}>
                                <SquarePen className="m-1 ml-auto" size={18} onClick={() => { setEdit(30) }} />
                                {allData?.languages.map((lang, index) => (
                                    <li key={index}>{lang}</li>
                                ))}
                            </div>
                            <div className={`bg-white p-1 rounded-xl sm:w-[72%] border-2 border-gray-300 ${edit == 30 ? '' : 'hidden'}`}>
                                <SquareCheckBig className="m-1 ml-auto" size={18} onClick={() => {
                                    if (langArr.length !== 0) {
                                        editHandler('languages', langArr)
                                    }
                                    setEdit(0)
                                    setLanguage("")
                                }} />
                                <div className="flex">
                                    <input type="text" placeholder="Language" className="focus:outline-none border border-gray-300 p-1 rounded-xl"
                                        value={language}
                                        onChange={(e) => { setLanguage(e.target.value) }}
                                    />
                                    <button className="border border-gray-300 p-1 rounded-xl bg-gray-100 text-gray-600 active:bg-gray-300"
                                        onClick={() => {
                                            if (language !== '') {
                                                setLangArr([...langArr, language])
                                            }
                                        }}>Add</button>
                                </div>

                                <div>
                                    {langArr.map((lang: string, index: number) => (
                                        <div key={index} className="flex gap-x-3"><li>{lang}</li></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <ToastContainer />
        </>
    )
}