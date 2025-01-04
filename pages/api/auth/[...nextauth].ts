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
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.customerId = user.customerId;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpireAt = user.accessTokenExpireAt * 1000;
        token.refreshTokenExpireAt = user.refreshTokenExpireAt * 1000;
      }

      if (Date.now() < token.accessTokenExpireAt) {
        console.log("return token");
        return token;
      } else if (
        Date.now() > token.accessTokenExpireAt &&
        Date.now() < token.refreshTokenExpireAt
      ) {
        const res = await axios.post(
          "http://localhost:8100/user/refresh-token",
          {
            credential_id: token.id,
            customer_id: token.customerId,
            refresh_token: token.refreshToken,
          },
        );

        if (res.data?.status === "ok" && res.data.user) {
          let accessTokenDecoded = decode(
            res.data.user.credential.access_token,
          ) as DecodeToken | null;

          let refreshTokenDecode = decode(
            res.data.user.credential.refresh_token,
          ) as DecodeToken | null;

          token.id = user.id;
          token.customerId = user.customerId;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.accessTokenExpireAt = accessTokenDecoded
            ? accessTokenDecoded.exp * 1000
            : 0;
          token.refreshTokenExpireAt = refreshTokenDecode
            ? refreshTokenDecode.exp * 1000
            : 0;
        }

        return token;
      }

      return null;
    },
    async session({ session, token }: { session: any; token: any }) {
      const now = Date.now();

      if (now > token.accessTokenExpireAt) {
        console.log("session is expired");
        session.error = "AccessToken is expired";
      }

      session.user = {
        ...session.user,
        _id: token.id as string,
        customer_id: token.customerId as string,
        access_token: token.accessToken as string,
        refresh_token: token.refreshToken as string,
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

// const refreshTokenRotation = async (token: string): Promise<any> => {
//   const res = await axios.post(`${process.env.NEXT_DEV_AUTH_URL_REFRESHTOKEN}`, {

//   });

//   return 0;
// };

export default NextAuth(authOptions);
