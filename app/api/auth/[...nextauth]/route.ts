import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"



const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        const res = await fetch("http://localhost:8100/user/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        console.log("user:", user)

        if (user?.status == "ok") {
          user.user.id = user.user._id
          user.user.image = user.user.image_url
          user.user.name = user.user.user_name
          return user.user
        } else {
          console.log("status err")
          throw new Error(JSON.stringify({ errors: "login failed", status: false }))
        }

      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin

      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = token as any

      return session
    }

  },
  pages: {
    signIn: '/authentication/login',
    error: '/authentication/login',
  },
})

export { handler as GET, handler as POST }