"use client";
import { useState } from "react";
import { Input } from "@/components/Core/Input";
import classes from "./ForgotPasswordForm.module.css";
import { Button } from "@/components/Core/Button";
import { Get } from "@/axios/AxiosFunctions";
import { BaseURL } from "@/config/apiUrl";
import { toast } from "react-toastify";
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const submitHandler = async () => {
    if (email === "" || email === undefined) {
      return toast.error("Please fill the email field");
    }
    const response = await Get(BaseURL("/"), { email });
    if (response !== undefined) {
      toast.success("Email has been sent to the associated email address");
    }
  };
  return (
    <>
      <Input
        value={email}
        setter={setEmail}
        placeholder="example@example.com"
        label="Email Address"
      />
      <div className={classes.spacingWrapper}>
        <p className={classes.listWrapper}>
          Enter the email address associated with your account, and we’ll email
          you a link to reset your password..
        </p>
      </div>
      <Button
        onClick={submitHandler}
        variant="tertiary"
        customStyle={{ marginBottom: "1rem" }}
      >
        Send Reset Link
      </Button>
    </>
  );
}
