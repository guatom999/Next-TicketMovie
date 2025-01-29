import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { decode } from "@/utils/decode";
import { signOut } from "next-auth/react";

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
            let accessTokenDecoded = decode(
              res.data.user.credential.access_token,
            ) as DecodeToken | null;

            let refreshTokenDecode = decode(
              res.data.user.credential.refresh_token,
            ) as DecodeToken | null;

            const accessTokenExpireAt = accessTokenDecoded?.exp ?? 0;
            const refreshTokenExpireAt = refreshTokenDecode?.exp ?? 0;

            return {
              id: res.data.user._id,
              customerId: res.data.user.customer_id,
              name: res.data.user.user_name,
              email: res.data.user.email,
              image: res.data.user.image_url,
              accessToken: res.data.user.credential.access_token,
              refreshToken: res.data.user.credential.refresh_token,
              accessTokenExpireAt: accessTokenExpireAt,
              refreshTokenExpireAt: refreshTokenExpireAt,
            };
          }
          return null;
        } catch (error) {
          // console.log("login error", error);
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
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.customerId = user.customerId;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpireAt = user.accessTokenExpireAt * 1000;
        token.refreshTokenExpireAt = user.refreshTokenExpireAt * 1000;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      const now = Date.now();

      if (token.accessTokenExpireAt && now > token.accessTokenExpireAt) {
        console.log("already expired and try to refreshToken");
        try {
          const res = await axios.post(
            `${process.env.NEXT_DEV_AUTH_URL_REFRESHTOKEN}`,
            {
              credential_id: token.id,
              customer_id: token.customerId,
              refresh_token: token.refreshToken,
            },
          );

          if (res.data?.status === "ok" && res.data.user) {
            const accessTokenDecoded = decode(
              res.data.user.credential.access_token,
            ) as DecodeToken | null;
            const refreshTokenDecoded = decode(
              res.data.user.credential.refresh_token,
            ) as DecodeToken | null;

            token.accessToken = res.data.user.credential.access_token;
            token.refreshToken = res.data.user.credential.refresh_token;
            token.accessTokenExpireAt = accessTokenDecoded?.exp
              ? accessTokenDecoded.exp * 1000
              : now;
            token.refreshTokenExpireAt = refreshTokenDecoded?.exp
              ? refreshTokenDecoded.exp * 1000
              : now;
          }
        } catch (error) {
          console.error("Error refreshing token:");
          await signOut({ redirect: false });
        }
      }

      session.user = {
        ...session.user,
        _id: token.id,
        customer_id: token.customerId,
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
      };

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
    // maxAge: Number(process.env.SESSION_DURATION),
  },
};

export default NextAuth(authOptions);
