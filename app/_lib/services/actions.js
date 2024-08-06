"use server";

import { cookies } from "next/headers";
import { supabase } from "../supabase/supabase";
import { redirect } from "next/navigation";
import { createUser, getUser } from "./data-service";

export async function signInAction(formData) {
  const password = formData.get("password");
  const email = formData.get("email");

  const userData = { email, password };
  const { data, error } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message);
  }

  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("user", JSON.stringify(data?.user.id), {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: oneDay,
  });

  const existingUser = await getUser(data?.user.id);

  if (!existingUser) createUser(data?.user);

  redirect("/");
  return { success: true };
}

export async function signup(formData) {
  const password = formData.get("password");
  const email = formData.get("email");
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error(error.message);
    throw new Error(error.message); // Correctly throw an error
  }

  redirect("/login");
  return data;
}

// Uncomment this and implement signOut when needed
// export async function signOutAction() {
//   await signOut({ redirectTo: "/login" });
// }
