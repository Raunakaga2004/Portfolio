import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name : "Credentials",

      credentials : {
        username : { label : "Username", type : "text" },
        password : { label : "Password", type : "password" },
      }, 
      async authorize(credentials : any, req : any) : Promise<any> {
        //add logic here

        const username = credentials?.username;
        const password = credentials?.password;

        if(username === process.env.ADMIN_PAGE_USERNAME && password === process.env.ADMIN_PAGE_PASSWORD){
          return {id : 1, name : "Raunak"};
        }

        else return null;
      }
    }),
    
  ],
  pages : {
    signIn : "/login"
  },
  secret : process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 