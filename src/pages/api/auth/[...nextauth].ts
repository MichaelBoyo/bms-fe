// Import necessary modules and packages
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

import { BACKEND_URL } from "@/services/auth";
// Configure NextAuth with authentication options
export default NextAuth({
  // Session configuration using JWT (JSON Web Token) strategy
  session: {
    strategy: "jwt",
  },
  // Custom pages for authentication flows
  pages: {
    signIn: "/Login", // Custom sign-in page for authentication
  },
  // Authentication providers
  providers: [
    // CredentialsProvider allows authentication using email and password
    CredentialsProvider({
      name: "Credentials", // Name of the provider
      credentials: {
        // Fields for collecting email and password during sign-in
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorize function handles authentication logic with provided credentials
      async authorize(credentials, req) {
        // Make a POST request to the authentication endpoint with the provided credentials
        const res = await axios.post(BACKEND_URL + "/auth/login", credentials);
        const user = res.data;

        // If no error and we have user data, return it as the authenticated user
        if (res.status === 200 && user) {
          return user;
        }
        // Return null if user data could not be retrieved, indicating authentication failure
        return null;
      },
    }),
  ],
  // Callbacks for JWT and session management
  callbacks: {
    // jwt callback is called whenever a JWT is created or updated
    async jwt({ token, user, trigger, session }) {
      // If there's any change to the session (e.g., user logs in or out), update the JWT token
      if (trigger === "update") {
        return { ...token, ...session.user }; // Update token with the user data from the session
      }
      return { ...token, ...user }; // Update token with the user data from the user object
    },
    // session callback is called whenever a session is created or updated
    async session({ session, token, user }) {
      session.user = token as any; // Attach the token data to the session's user object
      return session; // Return the updated session object
    },
  },
});
