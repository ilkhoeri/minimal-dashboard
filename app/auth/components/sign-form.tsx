// @ts-nocheck
"use client";
import React from "react";
import { useSignIn, useSignUp } from "./action";
import { Form, FormField } from "@/components/ui/form";

import "./sign-form.css";

export function SignForm({
  signGithub,
  signForm = "signin"
}: {
  signGithub: React.ReactNode;
  signForm?: "signin" | "signup";
}) {
  const {
    signupForm,
    onSubmit: signUpSubmit,
    disabled: signUpDisabled
  } = useSignUp();
  const {
    signinForm,
    onSubmit: signInSubmit,
    disabled: signInDisabled
  } = useSignIn();

  const [hidePsw, setHidePsw] = React.useState(false);
  const [signProv, setSignProv] = React.useState(false);

  const signin = signForm === "signin";
  const signup = signForm === "signup";
  const onSubmit = signup
    ? signupForm.handleSubmit(signUpSubmit)
    : signinForm.handleSubmit(signInSubmit);
  const control = signup ? signupForm.control : signinForm.control;
  const disabled = signup ? signUpDisabled : signInDisabled;

  const restInput = (placeholder: string) => {
    return {
      required: true,
      spellCheck: false,
      className: "input",
      disabled,
      placeholder
    };
  };

  return (
    <div className="card">
      <Form {...(signup ? signupForm : signinForm)}>
        <form
          className="form"
          data-hide={hidePsw}
          data-sign={signProv ? "provider" : "email"}
          data-form={signin ? "signin" : "signup"}
          onSubmit={onSubmit}
        >
          <div className="title">
            <h2>
              {signin ? "Sign In" : "Sign Up"}
              <span data-sign={signProv && "github"}>with GitHub</span>
            </h2>
          </div>

          <div className="main">
            {signup && (
              <>
                <label className="label_input" htmlFor="name">
                  Name
                </label>

                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <input
                      type="text"
                      id="name"
                      {...restInput("johndoe")}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            <label className="label_input" htmlFor="email">
              Email
            </label>
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <input
                  type="email"
                  id="email"
                  {...restInput("johndoe@mail.com")}
                  {...field}
                />
              )}
            />

            <div className="frg_pss">
              <label className="label_input" htmlFor="password">
                Password
              </label>
              {signin && (
                <a href="" aria-disabled="true" tabIndex={-1}>
                  Forgot password?
                </a>
              )}
            </div>
            <div className="w-full relative flex flex-row items-center">
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <input
                    id="password"
                    type={hidePsw ? "password" : "text"}
                    {...restInput("Johndoe123?")}
                    {...field}
                  />
                )}
              />

              <div className="blind_input" onClick={() => setHidePsw(!hidePsw)}>
                {hidePsw ? "Show" : "Hide"}
              </div>
            </div>

            {signup && (
              <>
                <label className="label_input" htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <input
                      id="confirmPassword"
                      type={hidePsw ? "password" : "text"}
                      {...restInput("Johndoe123?")}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            <button className="submit" type="submit" disabled={disabled}>
              Submit
            </button>
          </div>
        </form>
      </Form>

      <button
        type="button"
        className="option_sign"
        onClick={() => setSignProv(!signProv)}
        disabled={disabled}
      >
        {signin ? "Sign in" : "Sign up"}
        {signProv ? " with Email" : " with Github"}
      </button>

      <div className="avatar" data-hide={hidePsw}>
        {signProv ? signGithub : <Monkey />}
      </div>
    </div>
  );
}

function Monkey() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 64 64"
        id="face"
        className="monkey_face"
      >
        <ellipse cx="53.7" cy="33" rx="8.3" ry="8.2" fill="#89664c"></ellipse>
        <ellipse cx="53.7" cy="33" rx="5.4" ry="5.4" fill="#ffc5d3"></ellipse>
        <ellipse cx="10.2" cy="33" rx="8.2" ry="8.2" fill="#89664c"></ellipse>
        <ellipse cx="10.2" cy="33" rx="5.4" ry="5.4" fill="#ffc5d3"></ellipse>
        <g fill="#89664c">
          <path d="m43.4 10.8c1.1-.6 1.9-.9 1.9-.9-3.2-1.1-6-1.8-8.5-2.1 1.3-1 2.1-1.3 2.1-1.3-20.4-2.9-30.1 9-30.1 19.5h46.4c-.7-7.4-4.8-12.4-11.8-15.2"></path>
          <path d="m55.3 27.6c0-9.7-10.4-17.6-23.3-17.6s-23.3 7.9-23.3 17.6c0 2.3.6 4.4 1.6 6.4-1 2-1.6 4.2-1.6 6.4 0 9.7 10.4 17.6 23.3 17.6s23.3-7.9 23.3-17.6c0-2.3-.6-4.4-1.6-6.4 1-2 1.6-4.2 1.6-6.4"></path>
        </g>
        <path
          d="m52 28.2c0-16.9-20-6.1-20-6.1s-20-10.8-20 6.1c0 4.7 2.9 9 7.5 11.7-1.3 1.7-2.1 3.6-2.1 5.7 0 6.1 6.6 11 14.7 11s14.7-4.9 14.7-11c0-2.1-.8-4-2.1-5.7 4.4-2.7 7.3-7 7.3-11.7"
          fill="#e0ac7e"
        ></path>
        <g fill="#3b302a" className="eye_nose">
          <path d="m35.1 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.6.1 1 1 1 2.1"></path>
          <path d="m30.9 38.7c0 1.1-.4 2.1-1 2.1-.6 0-1-.9-1-2.1 0-1.1.4-2.1 1-2.1.5.1 1 1 1 2.1"></path>
          <ellipse
            cx="40.7"
            cy="31.7"
            rx="3.5"
            ry="4.5"
            className="eye_r"
          ></ellipse>
          <ellipse
            cx="23.3"
            cy="31.7"
            rx="3.5"
            ry="4.5"
            className="eye_l"
          ></ellipse>
        </g>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 64 64"
        id="hands"
        className="monkey_hands"
      >
        <path
          fill="#89664C"
          d="M9.4,32.5L2.1,61.9H14c-1.6-7.7,4-21,4-21L9.4,32.5z"
        ></path>
        <path
          fill="#FFD6BB"
          d="M15.8,24.8c0,0,4.9-4.5,9.5-3.9c2.3,0.3-7.1,7.6-7.1,7.6s9.7-8.2,11.7-5.6c1.8,2.3-8.9,9.8-8.9,9.8
	s10-8.1,9.6-4.6c-0.3,3.8-7.9,12.8-12.5,13.8C11.5,43.2,6.3,39,9.8,24.4C11.6,17,13.3,25.2,15.8,24.8"
        ></path>
        <path
          fill="#89664C"
          d="M54.8,32.5l7.3,29.4H50.2c1.6-7.7-4-21-4-21L54.8,32.5z"
        ></path>
        <path
          fill="#FFD6BB"
          d="M48.4,24.8c0,0-4.9-4.5-9.5-3.9c-2.3,0.3,7.1,7.6,7.1,7.6s-9.7-8.2-11.7-5.6c-1.8,2.3,8.9,9.8,8.9,9.8
	s-10-8.1-9.7-4.6c0.4,3.8,8,12.8,12.6,13.8c6.6,1.3,11.8-2.9,8.3-17.5C52.6,17,50.9,25.2,48.4,24.8"
        ></path>
      </svg>
    </>
  );
}
