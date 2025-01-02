import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { decode } from "@/utils/decode";
import { GetNumericalDate } from "@/utils/time";

interface DecodeToken {
  exp: number;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://localhost:8100/user/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data?.status === "ok" && res.data.user) {
            let decodedToken = decode(
              res.data.user.credential.access_token,
            ) as DecodeToken | null;

            const expireAt = decodedToken?.exp ?? 0;

            return {
              id: res.data.user._id,
              customerId: res.data.user.customer_id,
              name: res.data.user.user_name,
              email: res.data.user.email,
              image: res.data.user.image_url,
              accessToken: res.data.user.credential.access_token,
              refreshToken: res.data.user.credential.refresh_token,
              expireAt,
            };
          }
          return null;
        } catch (error) {
          console.log("login error", error);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.customerId = user.customerId;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expireAt = user.expireAt;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        _id: token.id as string,
        customer_id: token.customerId as string,
        access_token: token.accessToken as string,
        refresh_token: token.refreshToken as string,
      };

      const now = new Date();

      session.expires = new Date().toISOString();

      return session;
    },
  },
  pages: {
    signIn: "/authentication/login",
    error: "/authentication/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.SESSION_DURATION),
  },
};

export default NextAuth(authOptions);
