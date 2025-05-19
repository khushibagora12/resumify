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

// defining the schema
const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    profession: z.string().min(3, {
        message: "Profession must be at least 5 characters."
    }),
    email: z.string().email("This is not a valid email.").min(3, {
        message: "Email must be at least 5 characters."
    }),
    contactNo: z.string().min(10, {
        message: "contact number must be of 10 numbers."
    }).max(10, {
        message: "contact number must be of 10 numbers."
    }),
    about: z.string().min(1, {
        message: "This field cannot be empty"
    })
});

export default function UserInfo() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            profession: '',
            email: '',
            contactNo: '',
            about: ''
        },
    });
    
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
                <form className="space-y-10 ml-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-0">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold`}>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
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
                                        <Input placeholder="Enter your profession" {...field} />
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
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold`}>Contact no.</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your contact number" {...field} />
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
                                    <textarea placeholder="A more detailed summary of yourself and what you do." className="h-30 w-[90%] bg-white p-5 rounded-xl outline-none shadow-gray-300 shadow-sm" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <Button type='submit'>Continue</Button> */}
                </form>
            </Form>
        </>
    )
}


