import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/database";
import User from "@/models/userModel";
const bcrypt = require("bcryptjs");
//console.log(process.env.Google_ID);
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.Google_ID,
      clientSecret: process.env.Google_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "example@.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({ email });
          //console.log(user);
          if (!user) {
            return null;
          }

          if (!(await bcrypt.compare(password, user.password))) {
            return null;
          }
          //console.log("userImg: " + user);
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }) {
      //console.log(user, account);
      if (account.provider === "google") {
        const { name, email, image } = user;
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password: "oauth",
              image,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            // console.log("res", data.user);
            return data.user;
          }
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        if (!user.id.match(/^[0-9a-fA-F]{24}$/)) {
          await connectDB();
          const Id = await User.findOne({ email: user.email }).select("_id");
          user.id = Id._id;
          // console.log("Id: " + Id._id);
        }
        return {
          ...token,

          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session" + session, token, user);
      if (token?.id)
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          },
        };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signup",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
