import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    status: string;
    user: {
      _id: string;
      email: string;
      user_name: string;
      customer_id: string;
      image: string;
      created_at: string;
      updated_at: string;
      access_token: string;
      refresh_token: string;
    };
  }

  interface User {
    id: string;
    customerId: string;
    name: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }
}
