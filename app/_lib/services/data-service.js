import { supabase } from "../supabase/supabase";
import codepen from "@/public/assets/images/icon-codepen.svg";
import codepenActive from "@/public/assets/images/icon-codepen-active.svg";
import codepenActiveCopy from "@/public/assets/images/icon-codepen-active-copy.svg";

import codewar from "@/public/assets/images/icon-codewars.svg";
import codewarsActive from "@/public/assets/images/icon-codewars-active.svg";

import codewarsActiveCopy from "@/public/assets/images/icon-codewars-active-copy.svg";

import devto from "@/public/assets/images/icon-devto.svg";
import devtoActive from "@/public/assets/images/icon-devto-active.svg";
import devtoActivecopy from "@/public/assets/images/icon-devto-active-copy.svg";

import email from "@/public/assets/images/icon-email.svg";
import emailActive from "@/public/assets/images/icon-email-active.svg";

import emailActivecopy from "@/public/assets/images/icon-email-active-copy.svg";

import facebook from "@/public/assets/images/icon-facebook.svg";
import facebookActive from "@/public/assets/images/icon-facebook-active.svg";

import facebookActiveCopy from "@/public/assets/images/icon-facebook-active-copy.svg";

import freecodecamp from "@/public/assets/images/icon-freecodecamp.svg";
import freecodecampActive from "@/public/assets/images/icon-freecodecamp-active.svg";

import freecodecampActivecopy from "@/public/assets/images/icon-freecodecamp-active-copy.svg";

import frontendMentor from "@/public/assets/images/icon-frontend-mentor.svg";
import frontendMentorActive from "@/public/assets/images/icon-frontend-mentor-active.svg";

import frontendMentorActivecopy from "@/public/assets/images/icon-frontend-mentor-active-copy.svg";

import github from "@/public/assets/images/icon-github.svg";
import githubActive from "@/public/assets/images/icon-github-active.svg";

import githubActivecopy from "@/public/assets/images/icon-github-active-copy.svg";

import gitlab from "@/public/assets/images/icon-gitlab.svg";

import gitlabctivecopy from "@/public/assets/images/icon-gitlab-active-copy.svg";

import gitlabActive from "@/public/assets/images/icon-gitlab-active.svg";
import hashnode from "@/public/assets/images/icon-hashnode.svg";
import hashnodeActive from "@/public/assets/images/icon-hashnode-active.svg";

import hashnodeActivecopy from "@/public/assets/images/icon-hashnode-active-copy.svg";

import linkedin from "@/public/assets/images/icon-linkedin.svg";
import linkedinActive from "@/public/assets/images/icon-linkedin-active.svg";
import linkedinActivecopy from "@/public/assets/images/icon-linkedin-active-copy.svg";

import stackOverflow from "@/public/assets/images/icon-stack-overflow.svg";
import stackOverflowActive from "@/public/assets/images/icon-stack-overflow-active.svg";

import stackOverflowActivecopy from "@/public/assets/images/icon-stack-overflow-active-copy.svg";

import twitter from "@/public/assets/images/icon-twitter.svg";
import twitterActive from "@/public/assets/images/icon-twitter-active.svg";

import twitterActivecopy from "@/public/assets/images/icon-twitter-active-copy.svg";

import twitch from "@/public/assets/images/icon-twitch.svg";
import twitchActive from "@/public/assets/images/icon-twitch-active.svg";

import twitchActivecopy from "@/public/assets/images/icon-twitch-active-copy.svg";

import youtube from "@/public/assets/images/icon-youtube.svg";
import youtubeActive from "@/public/assets/images/icon-youtube-active.svg";
import youtubeActivecopy from "@/public/assets/images/icon-youtube-active-copy.svg";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function createUser(user) {
  const userObj = {
    email: user.email,
    imageUrl: "",
    user_Id: user.id,
    role: user.role,
    firstName: "",
    lastName: "",
  };
  const { data, error } = await supabase.from("owners").insert([userObj]);

  if (error) {
    console.error(error);
    throw new error(error.message, "Unable to create user");
  }

  return data;
}

export async function getUsers() {
  const { data, error } = await supabase.from("owners").select("*");

  if (error) {
    console.error(error);
    throw new error(error.message, "Unable to get users");
  }

  return data;
}

// Client-side file upload function
export async function uploadImage(file) {
  const imageName = `${Math.random()}-${file.name}`.replaceAll("/", "");

  const { error: storageError, data } = await supabase.storage
    .from("profile-pictures")
    .upload(imageName, file);

  if (storageError) {
    console.error("Error uploading image:", storageError.message);
    throw new Error(storageError.message);
  }

  // Construct the full image URL
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-pictures/${imageName}`;

  return imageUrl;
}

export async function getUser(id) {
  const { data, error } = await supabase
    .from("owners")
    .select("*")
    .eq("user_Id", id)
    .single();

  // if (error) {
  //   console.error(error);
  //   throw new error(error, "Unable to get user");
  // }

  return data;
}

export async function createLink(link) {
  const { data, error } = await supabase.from("links").insert([link]);

  if (error) {
    console.error(error.message);
    throw new Error(error.message, "Unable to create link");
  }

  return data;
}

export async function getLinks(id) {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("owner_Id", id);

  if (error) {
    console.error(error.message);
    throw new error(error.message, "Unable to get Links");
  }

  return data;
}

export async function getLink(id, linkId) {
  try {
    const data = await getLinks(id);

    // Find the object that matches the linkId
    const dataObj = data?.find((link) => link.id === Number(linkId));

    // Initialize an empty array and push the found object into it
    const linkArr = [];
    linkArr.push(dataObj);

    // Log the array and return it
    return linkArr;
  } catch (error) {
    console.error(error);
    notFound();
  }
}



export const linkTypes = [
  {
    name: "Github",
    icon: github,
    iconActive: githubActive,
    linkIcon: githubActivecopy,
    id: "1",
  },
  {
    name: "YouTube",
    icon: youtube,
    iconActive: youtubeActive,
    id: "2",
    linkIcon: youtubeActivecopy,
  },
  {
    name: "LinkedIn",
    icon: linkedin,
    iconActive: linkedinActive,
    id: "3",
    linkIcon: linkedinActivecopy,
  },
  {
    name: "Facebook",
    icon: facebook,
    iconActive: facebookActive,
    id: "4",
    linkIcon: facebookActiveCopy,
  },
  {
    name: "Frontend Mentor",
    icon: frontendMentor,
    iconActive: frontendMentorActive,
    id: "5",
    linkIcon: frontendMentorActivecopy,
  },
  {
    name: "Codepen",
    icon: codepen,
    iconActive: codepenActive,
    id: "6",
    linkIcon: codepenActiveCopy,
  },
  {
    name: "Codewars",
    icon: codewar,
    iconActive: codewarsActive,
    id: "7",
    linkIcon: codewarsActiveCopy,
  },
  {
    name: "Devto",
    icon: devto,
    iconActive: devtoActive,
    id: "8",
    linkIcon: devtoActivecopy,
  },
  {
    name: "Email",
    icon: email,
    iconActive: emailActive,
    id: "9",
    linkIcon: emailActivecopy,
  },
  {
    name: "Facebook",
    icon: facebook,
    iconActive: facebookActive,
    id: "10",
    linkIcon: facebookActiveCopy,
  },
  {
    name: "Stack Overflow",
    icon: stackOverflow,
    iconActive: stackOverflowActive,
    id: "11",
    linkIcon: stackOverflowActivecopy,
  },
  {
    name: "Gitlab",
    icon: gitlab,
    iconActive: gitlabActive,
    id: "12",
    linkIcon: gitlabctivecopy,
  },
  {
    name: "Hashnode",
    icon: hashnode,
    iconActive: hashnodeActive,
    id: "13",
    linkIcon: hashnodeActivecopy,
  },
  {
    name: "Twitch",
    icon: twitch,
    iconActive: twitchActive,
    id: "14",
    linkIcon: twitchActivecopy,
  },
  {
    name: "Twitter",
    icon: twitter,
    iconActive: twitterActive,
    id: "15",
    linkIcon: twitterActivecopy,
  },
  {
    name: "Freecode Camp",
    icon: freecodecamp,
    iconActive: freecodecampActive,
    id: "16",
    linkIcon: freecodecampActivecopy,
  },
];
