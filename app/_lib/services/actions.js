"use server";

import { cookies } from "next/headers";
import { supabase } from "../supabase/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createUser, getUser } from "./data-service";

export async function createLink(link) {
  const { data, error } = await supabase.from("links").insert([link]);

  if (error) {
    console.error(error);
    throw new Error(error.message, "Unable to create link");
  }

  revalidatePath("/");
  return data;
}

export async function deleteLinkById(id) {
  const { error } = await supabase.from("links").delete().eq("id", id);

  if (error) {
    console.error("Error deleting link:", error.message);
    throw new Error(error.message, "Unable to delete link");
  }

  return redirect("/");
}

export async function updateLink(id, link) {
  const { data, error } = await supabase
    .from("links")
    .update(link)
    .eq("id", id);

  if (error) {
    console.error("Error updating link:", error.message);
    throw new Error(error.message, "Unable to update link");
  }

  revalidatePath(`/${id}`);
  return data;
}

export async function signInAction(formData) {
  const { password } = formData;
  const { email } = formData;

  const userData = { email, password };
  const { data, error } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    cookies()?.delete("user");
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

  const existingUser = await getUser(data?.user?.id);

  if (existingUser) {
    redirect("/");
  }

  if (!existingUser) {
    await createUser(data?.user);

    redirect("/");
  }
}

export async function signup(formData) {
  const { email, password } = formData;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error(error.message);
    throw new Error(error.message); // Correctly throw an error
  }

  return data, redirect("/login");
}

export async function getSession() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function updateUser(id, user) {
  // Updating the user record with the correct image URL or path

  const userId = cookies().get("user");

  const curUser = await getUser(userId);

  let userObj;
  if (curUser?.imageUrl && user.imageUrl.includes("undefined"))
    userObj = { ...user, imageUrl: curUser.imageUrl };

  if (!curUser?.imageUrl && user.imageUrl.includes("undefined"))
    userObj = { ...user, imageUrl: "" };
  else userObj = { ...user };

  const { data, error } = await supabase
    .from("owners")
    .update(userObj)
    .eq("user_Id", id)
    .select();

  if (error) {
    console.error("Error updating user:", error.message);
    throw new Error(error.message);
  }

  // If the image already has a path, return the updated data

  // Revalidate the path if necessary
  revalidatePath("/details");

  return data;
}

export async function signOutAction() {
  cookies()?.delete("user");
  redirect("/login");
}
