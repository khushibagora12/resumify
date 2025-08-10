'use client';
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Flipped() {
    const [flipped, setFlipped] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => setFlipped(flipped => !flipped), 3000);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className={`relative h-150 w-100 m-10 rounded-2xl transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] shadow-gray-500 shadow-2xl ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>

                <div className="absolute w-full h-full backface-hidden ">
                    <Image
                        src={'/resume.png'}
                        alt="resume"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)]">
                    <Image
                        src={'/portfolio.png'}
                        alt="portfolio" 
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                
            </div>
        </>
    );
}