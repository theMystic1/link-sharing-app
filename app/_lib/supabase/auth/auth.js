// import { supabase } from "../supabase";
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { createUser, getUser, getUsers } from "../../services/data-service";

// export const {
//   signIn,
//   signOut,
//   auth,
//   handlers: { GET, POST },
// } = NextAuth({
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email: credentials.email,
//           password: credentials.password,
//         });

//         if (error || !data.user) {
//           console.error(error);
//           throw new Error("Invalid email or password");
//         }

//         const existingGuest = await getUser(credentials.email);

//         // Create user if they don't exist
//         if (!existingGuest) {
//           const userObj = {
//             email: data.user.email, // Use the correct property from data.user
//             imageUrl: "", // Provide a default or retrieved image URL
//             user_Id: data.user.id, // Use the correct property from data.user
//             role: "user", // Set a default role or retrieve it accordingly
//             firstName: "", // Add if needed
//             lastName: "", // Add if needed
//           };
//           await createUser(userObj);
//         }

//         return { id: data.user.id, email: data.user.email }; // Return user data for the session
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async session({ session, user }) {
//       const guest = await getUsers(session.user.email);

//       session.user.id = guest.user_Id; // Assuming guest has user_Id
//       return session;
//     },

//     authorized({ auth, request }) {
//       return !!auth?.user;
//     },
//   },
// });
