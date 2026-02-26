import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { decode } from "@/utils/decode";
// ✅ แก้ปัญหาที่ 1: ลบ import signOut จาก "next-auth/react" ออก
// signOut จาก next-auth/react ใช้ได้เฉพาะ client-side เท่านั้น
// ใน server callback ต้องใช้ token.error แทน แล้วให้ client เป็นคน signOut เอง

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
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_DEV_CUSTOMER_URL}/user/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );

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
    // ✅ แก้ปัญหาที่ 2: ย้าย refresh token logic มาอยู่ใน jwt callback
    // jwt callback เป็นที่เก็บ token จริงๆ และ return token กลับไปบันทึกได้
    // ถ้าไว้ใน session callback → token ที่ refresh แล้วจะไม่ถูก save และหายทุกรอบ
    async jwt({ token, user }: { token: any; user: any }) {
      // login ครั้งแรก → รับค่าจาก authorize มา assign ลง token
      if (user) {
        token.id = user.id;
        token.customerId = user.customerId;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpireAt = user.accessTokenExpireAt * 1000;
        token.refreshTokenExpireAt = user.refreshTokenExpireAt * 1000;
        token.error = undefined;
      }

      const now = Date.now();

      // accessToken ยังไม่หมด → return token เดิมได้เลย
      if (token.accessTokenExpireAt && now <= token.accessTokenExpireAt) {
        return token;
      }

      // accessToken หมดแล้ว → ลอง refresh ด้วย refreshToken
      // ก่อน refresh ต้องเช็คว่า refreshToken ยังใช้ได้อยู่ไหม
      if (token.refreshTokenExpireAt && now > token.refreshTokenExpireAt) {
        // refreshToken หมดอายุด้วย → ให้ client signOut
        token.error = "RefreshTokenExpired";
        return token;
      }

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

          // ✅ อัปเดต token ใน jwt callback → NextAuth จะ persist ให้โดยอัตโนมัติ
          token.accessToken = res.data.user.credential.access_token;
          token.refreshToken = res.data.user.credential.refresh_token;
          token.accessTokenExpireAt = accessTokenDecoded?.exp
            ? accessTokenDecoded.exp * 1000
            : now;
          token.refreshTokenExpireAt = refreshTokenDecoded?.exp
            ? refreshTokenDecoded.exp * 1000
            : now;
          token.error = undefined;
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        // ✅ แก้ปัญหาที่ 1 จริงๆ: แทน signOut() ที่รันใน server ไม่ได้
        // ให้ set error flag แทน → client อ่าน session.error แล้วเรียก signOut() เอง
        token.error = "RefreshAccessTokenError";
      }

      return token;
    },

    // session callback → หน้าที่คือแค่ map ข้อมูลจาก token ออกมาให้ client ใช้
    // ไม่ต้องทำ refresh ที่นี่อีกต่อไป
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        ...session.user,
        _id: token.id,
        customer_id: token.customerId,
        access_token: token.accessToken,
        refresh_token: token.refreshToken,
      };

      // ส่ง error ออกไปให้ client รับรู้ → client จะเรียก signOut() เองได้
      if (token.error) {
        session.error = token.error;
      }

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
    // ✅ แก้ปัญหาที่ 3: เพิ่ม maxAge ให้ตรงกับ refreshToken expire
    // กำหนดเป็น 7 วัน (ควรตั้งให้ >= refreshToken หมดอายุ)
    // ถ้า maxAge สั้นกว่า refreshToken → session จะหมดก่อน token refresh ทัน
    maxAge: 7 * 24 * 60 * 60, // 7 วัน (หน่วยเป็นวินาที)
  },
};

export default NextAuth(authOptions);

