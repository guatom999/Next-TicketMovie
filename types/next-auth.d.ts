import NextAuth from 'next-auth';

declare module "next-auth" {
    interface Session {

        status: string,
        user: {
            _id: string,
            email: string,
            user_name: string,
            image_url: string,
            created_at: string,
            updated_at: string,
            credential: {
                access_token: string,
                refresh_token: string,
            }
        }
    }

}