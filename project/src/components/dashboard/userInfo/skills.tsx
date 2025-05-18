'use client'

import { poppins } from "../../ui/fonts"
import Image from "next/image"
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form';
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";

export default function Skills() {
    const [Tskills, setTSkills] = useState<string[]>([]);
    const [Tinput, setTInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [input, setInput] = useState('');
    function handleAddSkill() {
        if (input !== '') {
            setSkills([...skills, input]);
            setInput('');
        }
    }
    function handleAddTSkill() {
        if (Tinput !== '') {
            setTSkills([...Tskills, Tinput]);
            setTInput('');
        }
    }
    const form = useForm({
        defaultValues: {
            skills: '',
            Tskills: '',
        }
    });

    return (
        <>
            <div>
                <div className="m-10">
                    <p className="flex text-3xl font-medium" ><Image src={'/skills.png'} alt="info" height={40} width={40} className="mr-2" />Skills</p>
                </div>
                <div className={`${poppins.className} text-xl font-medium m-5 ml-10`}>Add Skills</div>
                <Form {...form}>
                    <form>
                        <div className="grid grid-cols-2">
                            <div className="ml-10 flex">
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
                    </form>
                </Form>
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
        </>
    )
}
