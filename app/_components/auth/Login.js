"use client";

import emailIcON from "@/public/assets/images/icon-email.svg";

import PasswordIcON from "@/public/assets/images/icon-password.svg";
import Button from "../ui/Button";
import AuthItem from "./AuthItem";
import AuthHeader from "./AuthHeader";
import AuthMessage from "./AuthMessage";
import AuthInput from "./AuthInput";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signInAction } from "@/app/_lib/services/actions";
import { useFormStatus } from "react-dom";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";

function Login() {
  const { register, formState } = useForm();

  const { pending } = useFormStatus();

  const { errors } = formState;

  return (
    <div className="rounded-md">
      <AuthItem>
        <AuthHeader>Login</AuthHeader>
        <AuthMessage>
          Add your details below to get back into the app
        </AuthMessage>

        <AuthInput label="Email address" error={errors?.email?.message}>
          <div className="relative h-6 w-6">
            <Image src={emailIcON} alt="Email icon" fill />
          </div>
          <input
            type="text"
            placeholder="e.g alex@gmail.com"
            className="h-full w-full  outline-none placeholder:text-lg placeholder:text-greyy-700 pr-12"
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

        <AuthInput
          label="Enter your password"
          error={errors?.password?.message}
        >
          <div className="relative h-6 w-6">
            <Image src={PasswordIcON} alt="Lock icon" fill />
          </div>
          <input
            type="password"
            placeholder="At least 8 characters"
            className="h-full w-full outline-none placeholder:text-lg placeholder:text-greyy-700 pr-12"
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

        <Button>{pending ? <SpinnerMini /> : "Login"}</Button>

        <AuthMessage className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-purples-500 pl-2">
            Create account
          </Link>
        </AuthMessage>
      </AuthItem>
    </div>
  );
}

export default Login;
