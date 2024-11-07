"use client";
import * as React from "react";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInSchema, SignUpSchema } from "@/schemas/auth";
import { signin, signup } from "./handler";

export function useSignUp() {
  const router = useRouter();

  const [disabled, setDisabled] = React.useState(false);
  const [transition, setTransition] = React.useTransition();

  type SignUpFormValues = z.infer<typeof SignUpSchema>;

  const signupForm = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (values: SignUpFormValues) => {
    setDisabled(true);
    setTransition(async () => {
      signup(values)
        .then((data) => {
          if (data.error) {
            console.log("SIGN_UP ERROR:", data.error);
            alert(data.error.toUpperCase());
          }
          if (data.success) {
            signupForm.reset();
            router.refresh();
            setDisabled(false);
          }
        })
        .catch(() => {
          alert("Something went wrong!");
        });
    });
  };

  return { signupForm, onSubmit, disabled: disabled || transition };
}

export function useSignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "LOGIN SUCCESS! wait redirect to home.";

  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [transition, setTransition] = React.useTransition();

  type SignInFormValues = z.infer<typeof SignInSchema>;

  const signinForm = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = (values: SignInFormValues) => {
    setDisabled(true);
    setTransition(() => {
      signin(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            console.log("SIGN_UP ERROR:", data.error);
            alert(data.error);
          }
          if (data?.success) {
            signinForm.reset();
            setDisabled(false);
          }
        })
        .catch(() => alert(urlError));
    });
  };

  return { signinForm, onSubmit, disabled: disabled || transition };
}
