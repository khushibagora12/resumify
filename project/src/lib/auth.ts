import credentials from 'next-auth/providers/credentials'
import type { NextAuthOptions } from "next-auth";
import { ConnectDB } from '@/connectdb/connectdb';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                try {
                    await ConnectDB();
                    const user = await User.findOne({ email: credentials?.email });

                    if (!user) {
                        return null;
                    }

                    const compare = await bcrypt.compare(credentials!.password, user.password);
                    if (!compare) {
                        console.log("wrong password");
                        return null;
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };
                } 
                catch (error) {
                    console.log("error in authorize function")
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({token, user}) {
            if(user){
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}) {
            if(session.user){
                session.user.id = token.id as string;
            }
            return session;
        }
    }
};