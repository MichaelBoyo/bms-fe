import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            jwtToken: string,
            userId: number,
            message: string,
            firstName: string,
            lastName: string,
            role: string,
            email: string,
        }
    }
}