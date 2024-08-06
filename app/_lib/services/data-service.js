import { supabase } from "../supabase/supabase";

const links = [
  {
    name: "",
    link: "",
    icon: "",
    id: "",
    ownersId: "",
  },
];

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
    throw error(error.message, "Unable to create user");
  }

  return data;
}

export async function getUsers() {
  const { data, error } = await supabase.from("owners").select("*");

  if (error) {
    console.error(error);
    throw error(error.message, "Unable to get users");
  }

  return data;
}

export async function getUser(id) {
  const user = await getUsers();

  return user.find((u) => u.user_Id === id);
}
