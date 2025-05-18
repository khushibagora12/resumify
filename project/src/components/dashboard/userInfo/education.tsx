'use client'

import Image from "next/image"
import { poppins } from "../../ui/fonts"
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
import { Button } from '../../ui/button';
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";

const formSchema = z.object({
    school10 : z.string().min(1,{
        message: "This field cannot be empty"
    }),
    board10 : z.string().min(1, {
        message: "This field cannot be empty"
    }),
    percentage10 : z.number().min(1, {
        message: "Enter valid percentage value"
    }).max(100, {
        message: "Enter valid percentage value"
    }),
    school12 : z.string().min(1,{
        message: "This field cannot be empty"
    }),
    board12 : z.string().min(1, {
        message: "This field cannot be empty"
    }),
    percentage12 : z.number().min(1, {
        message: "Enter valid percentage value"
    }).max(100, {
        message: "Enter valid percentage value"
    }),
    college : z.string().min(1, {
        message: "This field cannot be empty"
    }),
    degree : z.string().min(1, {
        message: "This field cannot be empty"
    }),
    cgpa : z.number().min(1, {
        message: "Enter valid cgpa value"
    }).max(10, {
        message: "Enter valid cgpa value"
    }),
    starty : z.number().min(2000, {
        message: "This field cannot be empty"
    }).max(2030, {
        message: "This field cannot be empty"
    }),
    endy : z.number().min(2000, {
        message: "This field cannot be empty"
    }).max(2030, {
        message: "This field cannot be empty"
    })
});

export default function Education(){    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            school10 : '',
            board10 : '',
            percentage10 : undefined,
            school12 : '',
            board12 : '',
            percentage12 : undefined,
            college : '',
            degree : '',
            cgpa : undefined,
            starty : undefined,
            endy : undefined,
        }
        });
        const onSubmit = (data: any) => {
            console.log("submitted data: ", data);
        };
    return(
        <>
        <div>
            <div className="m-10">
                <p className="flex text-3xl font-medium" ><Image src={'/education.png'} alt="info" height={40} width={40} className="mr-2"/>Education</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 ml-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-0">
                        <FormField
                            control={form.control}
                            name="school10"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold`}>School</FormLabel>
                                    <FormControl>
                                        <Input placeholder="School name(10th)" {...field}/>
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
                                        <Input placeholder="Enter board(10th)" {...field} />
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
                                        <Input placeholder="10th %age" {...field} />
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
                                        <Input placeholder="School name(12th)" {...field}/>
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
                                        <Input placeholder="Enter board(12th)" {...field} />
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
                                        <Input placeholder="12th %age" {...field} />
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
                                        <Input placeholder="College name" {...field} />
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
                                        <Input placeholder="Degree name" {...field} />
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
                                        <Input placeholder="cgpa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-y-5">
                    <FormField
                            control={form.control}
                            name="starty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold`}>Start year</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Startig year of your degree" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={`text-md ${poppins.className} font-semibold `}>End year</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ending year of your degree" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                    </div>
                    {/* <Button type="submit">submit</Button> */}
                </form>
            </Form>

        </div>
        </>
    )
}