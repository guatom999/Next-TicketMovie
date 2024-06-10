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
        const data = await res.json()

        console.log("data:" , data)

        if (data?.status == "ok") {
          data.user.id = data.user._id
          data.user.image = data.user.image_url
          data.user.name = data.user.user_name
          return data.user
        } else {
          console.log("status err")
          throw new Error(JSON.stringify({ errors: "login failed", status: false }))
        }

      }
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // ...add more providers here
  ],
  pages: {
  signIn: '/authentication/login',
  error: '/authentication/login',
},
})

export { handler as GET, handler as POST }