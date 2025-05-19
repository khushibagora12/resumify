'use client'

import { poppins } from "../../ui/fonts"
import Image from "next/image"
import { useForm } from 'react-hook-form';
import { useEffect } from "react";

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
import Link from "next/link";
export default function Certificates({onDataChange} : {onDataChange : (data : any) => void}) {
    const [pdfArr, setPdfArr] = useState<File[]>([]);
    const [pdf, setPdf] = useState<File | null>(null);

    const [certArr, setCertArr] = useState<string[]>([]);
    const [certName, setCertName] = useState('');

    function handleAddFile() {
        if (pdf !== null && certName !== '') {
            setPdfArr([...pdfArr, pdf]);
            setPdf(null);
            setCertArr([...certArr, certName])
            setCertName('');
        }
    }
    const form = useForm({
        defaultValues: {
            CertificateName: '',
            file: ''
        }
    })
    
    return (
        <>
            <div>
                <div className="m-10">
                    <p className="flex text-3xl font-medium" ><Image src={'/certificate.png'} alt="info" height={40} width={40} className="mr-2" />Certificates</p>
                </div>
                <Form {...form}>
                    <form>
                        <div className="w-full md:flex">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 ml-10 w-full">
                                <FormField
                                    control={form.control}
                                    name="CertificateName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={`text-md ${poppins.className} font-semibold`}>Certificate Name</FormLabel>
                                            <FormControl >
                                                <Input placeholder="Enter certificate name" {...field} className="w-[90%]"
                                                    id="certInput" value={certName} onChange={(e) => {
                                                        setCertName(e.target.value)
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
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="button" onClick={handleAddFile} className="justify-end mt-8 ml-10 md:ml-0">Add</Button>
                        </div>
                    </form>
                </Form>
            </div>
            <hr className="text-gray-400 m-10" />
            <div className="ml-10">
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
        </>
    )
}