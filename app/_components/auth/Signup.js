"use client";

import Image from "next/image";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthItem from "./AuthItem";
import AuthMessage from "./AuthMessage";
import { useForm } from "react-hook-form";
import emailIcON from "@/public/assets/images/icon-email.svg";

import PasswordIcON from "@/public/assets/images/icon-password.svg";
import Button from "../ui/Button";
import Link from "next/link";

import SpinnerMini from "../ui/SpinnerMini";
import { signup } from "@/app/_lib/services/actions";
import { useState } from "react";
import toast from "react-hot-toast";

function Signup() {
  const { register, formState, getValues, handleSubmit } = useForm();
  const [pending, setPending] = useState(false);

  const { errors } = formState;

  async function onSubmit(formData) {
    setPending(true);
    try {
      await signup(formData);
    } catch (error) {
      toast.error(error.message);

      throw new Error(error);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <AuthItem>
        <AuthHeader>Create account</AuthHeader>
        <AuthMessage>Let&apos;s get you started sharing links!</AuthMessage>

        <AuthInput label="Email address" error={errors?.email?.message}>
          <div className="relative h-6 w-6">
            <Image src={emailIcON} alt="Email icon" fill />
          </div>
          <input
            type="text"
            placeholder="e.g alex@gmail.com"
            className=" active:border-0 placeholder:text-lg bg-transparent outline-none placeholder:text-greyy-700 pr-12"
            id="email"
            {...register("email", {
              required: "Can't be empty",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
        </AuthInput>

        <AuthInput label="Create password" error={errors?.password?.message}>
          <div className="relative h-6 w-6">
            <Image src={PasswordIcON} alt="Lock icon" fill />
          </div>
          <input
            type="password"
            placeholder="At least 8 characters"
            className="h-full w-full py-2 outline-none placeholder:text-lg placeholder:text-greyy-700 pr-12"
            id="password"
            {...register("password", {
              required: "Can't be empty",
              minLength: {
                value: 8,
                message: "least 8 characters",
              },
            })}
          />
        </AuthInput>
        <AuthInput
          label="Confirm password"
          error={errors?.confirmPassword?.message}
        >
          <div className="relative h-6 w-6">
            <Image src={PasswordIcON} alt="Lock icon" fill />
          </div>
          <input
            type="password"
            placeholder="At least 8 characters"
            className="h-full w-full  outline-none placeholder:text-lg placeholder:text-greyy-700 pr-12"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Can't be empty",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </AuthInput>
        <Button onClick={handleSubmit(onSubmit)}>
          {" "}
          {pending ? <SpinnerMini /> : "Create new account"}
        </Button>

        <AuthMessage className="text-center">
          Already have an account?
          <Link href="/login" className="text-purples-500 pl-2">
            Login
          </Link>
        </AuthMessage>
      </AuthItem>
    </>
  );
}

export default Signup;
