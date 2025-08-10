export {default} from 'next-auth/middleware'

console.log("in middleware")

export const config = {
    matcher : ["/dashboard/:path*","/dashboard", "/dashboard/feedback", "/dashboard/resume"]
}