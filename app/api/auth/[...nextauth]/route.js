import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utls/database";
import { User } from '@models/user';

// console.log("clientId: ", process.env.GOOGLE_ID, "clientSecret: ", process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            await connectToDb();
            const sessionUser = await User.findOne({
                email: session.user.email
            });
            session.user.id = await sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                // every next js route is a server-less route
                await connectToDb();

                // check if user already exists
                const userExists = await User.findOne({ email: profile.email });

                // if not create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log("Sign-in error", error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };
