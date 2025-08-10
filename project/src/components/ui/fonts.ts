import {Bebas_Neue, Poppins, Playfair_Display, IBM_Plex_Serif, Limelight } from 'next/font/google';
 
export const bebas = Bebas_Neue({
    weight: ['400'],
    subsets: ['latin']});
export const poppins = Poppins({
    weight: ['800', '400', '600'],
    subsets: ["latin"]
});
export const playfair = Playfair_Display({
    weight: ['800', '400', '600'],
    subsets: ["cyrillic"]
});
export const plexSerif = IBM_Plex_Serif({
    weight : ['100', '400'],
    subsets: ["cyrillic"]
})
export const limelight = Limelight({
    weight : ['400'],
    subsets : ['latin']
})