'use client'

import { poppins } from "../../ui/fonts"
import Image from "next/image"
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form';
import { Input } from "../../ui/input";
import { Button } from '../../ui/button';
import Link from "next/link";

const formSchema = z.object({
    fullName: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    profession: z.string().min(3, {
        message: "Profession must be at least 5 characters."
    }),
    email: z.string().email("This is not a valid email.").min(3, {
        message: "Email must be at least 5 characters."
    }),
    contact: z.string().min(10, {
        message: "contact number must be of 10 numbers."
    }).max(10, {
        message: "contact number must be of 10 numbers."
    }),
    about: z.string().min(1, {
        message: "This field cannot be empty"
    }),
    Tskills: z.string().min(3).max(20).array(),
    skills: z.string().min(3).max(20).array(),
    school10: z.string().min(1, {
        message: "This field cannot be empty"
    }),
    board10: z.string().min(1, {
        message: "This field cannot be empty"
    }),
    percentage10: z.number().min(1, {
        message: "Enter valid percentage value"
    }).max(100, {
        message: "Enter valid percentage value"
    }),
    school12: z.string().min(1, {
        message: "This field cannot be empty"
    }),
    board12: z.string().min(1, {
        message: "This field cannot be empty"
    }),
    percentage12: z.number().min(1, {
        message: "Enter valid percentage value"
    }).max(100, {
        message: "Enter valid percentage value"
    }),
    college: z.string().min(1, {
        message: "This field cannot be empty"
    }),
    degree: z.string().min(1, {
        message: "This field cannot be empty"
    }),
    cgpa: z.number().min(1, {
        message: "Enter valid cgpa value"
    }).max(10, {
        message: "Enter valid cgpa value"
    }),
    startYear: z.number().min(2000, {
        message: "This field cannot be empty"
    }).max(2030, {
        message: "This field cannot be empty"
    }),
    endYear: z.number().min(2000, {
        message: "This field cannot be empty"
    }).max(2030, {
        message: "This field cannot be empty"
    }),
    certificates: z.string().min(2, {
        message: "This field cannot be empty"
    }).max(20),
    file: z.any()

});
export default function Alldata() {
    const [formData, setFormData] = useState({
        fullName: '',
        profession: '',
        email: '',
        contact: '',
        about: '',
        technicalSkills: [],
        nontechnicalSkills: [],
        school10: '',
        board10: '',
        percentage10: 0,
        school12: '',
        board12: '',
        percentage12: 0,
        college: '',
        degree: '',
        cgpa: 0,
        startYear: 0,
        endYear: 0,
        certificates: [{
            certName: '',
            file: null
        }]
    });
    //skills state
    const [Tskills, setTSkills] = useState<string[]>([]);
    const [Tinput, setTInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [input, setInput] = useState('');

    //certificate state
    const [pdfArr, setPdfArr] = useState<File[]>([]);
    const [pdf, setPdf] = useState<File | null>(null);
    const [certArr, setCertArr] = useState<string[]>([]);
    const [certName, setCertName] = useState('');

    function handleAddSkill() {
        if (input !== '') {
            setSkills([...skills, input]);
            setInput('');
            setFormData({
                ...formData,
                nontechnicalSkills: [...skills, input] 
            })

        }
    }
    function handleAddTSkill() {
        if (Tinput !== '') {
            setTSkills([...Tskills, Tinput]);
            setTInput('');
            setFormData({
                ...formData,
                technicalSkills: [...Tskills, Tinput] 
            })
        }
    }
    function handleAddFile() {
        if (pdf !== null && certName !== '') {
            setPdfArr([...pdfArr, pdf]);
            setCertArr([...certArr, certName])
            
            setPdf(null);
            setCertName('');
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            profession: '',
            email: '',
            contact: '',
            about: '',
            skills: [],
            Tskills: [],
            school10: '',
            board10: '',
            percentage10: undefined,
            school12: '',
            board12: '',
            percentage12: undefined,
            college: '',
            degree: '',
            cgpa: undefined,
            startYear: undefined,
            endYear: undefined,
            certificates: '',
            file: ''
        },
    });
    const handleAllData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    console.log(formData);
    const onSubmit = async (formData: any) => {
        console.log("submitted data: ", formData);
        try {
            const res = await fetch('/api/userInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (!data.ok) {
                throw new Error(data.message || 'failed.');
            }
            alert(data.message);

        }
        catch (e) {
            console.log("error caught")
        }
    };
    return (
        <>
            <div className="pl-10">
                <h1 className={`${poppins.className} text-3xl`}>Welcome user</h1>
                <h2 className={`${poppins.className} text-lg text-[#ADA7A7]`}>Date</h2>
            </div>

            <div className="m-10">
                <p className="flex text-3xl font-medium"><Image src={'/file.png'} alt="info" height={40} width={40} />Info</p>
                <p className="text-2xl font-medium">Write once, use anywhere</p>
            </div>
            <Form {...form}>
                <form className="space-y-10 ml-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-0">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold`}>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} value={formData.fullName} onChange={handleAllData} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profession"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold`}>Profession</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your profession" {...field} value={formData.profession} onChange={handleAllData} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold `}>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} value={formData.email} onChange={handleAllData} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold`}>Contact no.</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your contact number" {...field} value={formData.contact} onChange={handleAllData} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={`text-md ${poppins.className} font-semibold `}>About</FormLabel>
                                <FormControl>
                                    <textarea placeholder="A more detailed summary of yourself and what you do." className="h-30 w-[90%] bg-white p-5 rounded-xl outline-none shadow-gray-300 shadow-sm" {...field} value={formData.about} onChange={handleAllData} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <Button type='submit'>Continue</Button> */}
                    {/* skills */}
                    <div className="min-h-screen">
                        <div className="mt-20">
                            <p className="flex text-3xl font-medium" ><Image src={'/skills.png'} alt="info" height={40} width={40} className="mr-2" />Skills</p>
                        </div>
                        <div className={`${poppins.className} text-xl font-medium m-5 ml-0`}>Add Skills</div>
                        <div className="grid grid-cols-2">
                            <div className=" flex">
                                <FormField
                                    control={form.control}
                                    name="Tskills"
                                    render={({ field }) => (
                                        <FormItem className="w-[90%]">
                                            <FormControl>
                                                <Input placeholder="Technical skills" {...field}
                                                    id="TskillInput" value={Tinput} onChange={(e) => {
                                                        setTInput(e.target.value)
                                                    }}
                                                    className="border-gray-400 border-1 focus:ring-2 ring-gray-400 w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" onClick={handleAddTSkill}>Add</Button>
                            </div>
                            <div className="ml-10 flex">
                                <FormField
                                    control={form.control}
                                    name="skills"
                                    render={({ field }) => (
                                        <FormItem className="w-[90%]">
                                            <FormControl>
                                                <Input placeholder="Non-technical skills" {...field}
                                                    id="skillInput" value={input} onChange={(e) => {
                                                        setInput(e.target.value)
                                                    }}
                                                    className="border-gray-400 border-1 focus:ring-2 ring-gray-400 w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" onClick={handleAddSkill}>Add</Button>
                            </div>
                        </div>
                        <hr className="m-10 text-gray-400" />
                        <div className="grid grid-cols-2">
                            <div className="ml-10">
                                {Tskills.map((skill, index) => (
                                    <div key={index} className="text-lg m-3 font-medium ">
                                        <li>{skill}</li>
                                    </div>
                                ))}
                            </div>
                            <div className="ml-10">
                                {skills.map((skill, index) => (
                                    <div key={index} className="text-lg m-3 font-medium ">
                                        <li>{skill}</li>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* education */}
                    <div className="min-h-scree">
                        <div className="m-10 ml-0">
                            <p className="flex text-3xl font-medium" ><Image src={'/education.png'} alt="info" height={40} width={40} className="mr-2" />Education</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-0">
                            <FormField
                                control={form.control}
                                name="school10"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold`}>School</FormLabel>
                                        <FormControl>
                                            <Input placeholder="School name(10th)" {...field} value={formData.school10} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="board10"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold`}>Board</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter board(10th)" {...field} value={formData.board10} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="percentage10"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold `}>Percentage(out of 100)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="10th %age" {...field} value={formData.percentage10} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="school12"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold`}>School</FormLabel>
                                        <FormControl>
                                            <Input placeholder="School name(12th)" {...field} value={formData.school12} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="board12"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold`}>Board</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter board(12th)" {...field} value={formData.board12} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="percentage12"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold `}>Percentage(out of 100)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12th %age" {...field} value={formData.percentage12} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="college"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold`}>College</FormLabel>
                                        <FormControl>
                                            <Input placeholder="College name" {...field} value={formData.college} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="degree"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold`}>Degree</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Degree name" {...field} value={formData.degree} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cgpa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold`}>CGPA(out of 10)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="cgpa" {...field} value={formData.cgpa} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-y-5 mt-10">
                            <FormField
                                control={form.control}
                                name="startYear"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold`}>Start year</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Startig year of your degree" {...field} value={formData.startYear} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endYear"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={`text-md ${poppins.className} font-semibold `}>End year</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ending year of your degree" {...field} value={formData.endYear} onChange={handleAllData} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                        </div>
                    </div>
                    {/* certificates */}
                    <div className="min-h-screen">
                        <div className="m-10 ml-0">
                            <p className="flex text-3xl font-medium" ><Image src={'/certificate.png'} alt="info" height={40} width={40} className="mr-2" />Certificates</p>
                        </div>
                        <div className="w-full md:flex">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 w-full">
                                <FormField
                                    control={form.control}
                                    name="certificates"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={`text-md ${poppins.className} font-semibold`}>Certificate Name</FormLabel>
                                            <FormControl >
                                                <Input placeholder="Enter certificate name" {...field} className="w-[90%]"
                                                    id="certInput" value={certName} onChange={(e) => {
                                                        setCertName(e.target.value)
                                                        handleAllData(e)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={`text-md ${poppins.className} font-semibold`}>Upload pdf</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" type="file" accept="application/pdf" {...field} className="w-[90%]"
                                                    id="pdfs" onChange={(e) => {
                                                        const file = e.target.files?.[0]
                                                        setPdf(file || null)
                                                        handleAllData(e)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="button" onClick={handleAddFile} className="justify-end mt-8  md:ml-0">Add</Button>
                        </div>
                        <hr className="text-gray-400 m-10" />
                        <div className="">
                            {certArr.map((certs, index) => (
                                <div key={index} className="flex">
                                    <div className="text-lg m-3 font-medium ">
                                        <li>{certs}</li>
                                    </div>
                                    {
                                        pdfArr[index] && (
                                            <div className="text-lg m-3 font-medium flex">
                                                <Link
                                                    href={URL.createObjectURL(pdfArr[index])}
                                                    target="_blank"
                                                    className="flex"
                                                >
                                                    <Image src={"/link.png"} height={30} width={30} alt="link" className="mr-1" />
                                                    View pdf
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            ))}

                        </div>
                    </div>
                    <Button type='submit'>Submit</Button>
                </form>
            </Form >
        </>
    )
}