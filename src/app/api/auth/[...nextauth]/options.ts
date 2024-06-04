import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      // Fields to generate form on the sign in page
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      // Add logic here to look up the user from the credentials provided (database...)
      async authorize(credentials, req) {
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
        // Hard-code in a user for now
        const user = {
          id: "1",
          name: "jsmith",
          email: "jsmith@example.com",
          password: "nextauth",
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          // Object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check the details
          return null;
          // Optional to send user to an error page
        }
      },
    }),
  ],
};
