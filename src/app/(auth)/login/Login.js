"use client";
import classes from "./LoginForm.module.css";
import { useState } from "react";
import { Input } from "@/components/Core/Input";
import { Checkbox } from "@/components/Core/Checkbox";
import { Button } from "@/components/Core/Button";
import Link from "next/link";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRemeberMe] = useState(false);
  const submitHandler = () => {};
  return (
    <>
      <Input
        label={"Email"}
        value={email}
        setter={setEmail}
        placeholder="example@example.com"
      />
      <Input
        label={"Password"}
        value={password}
        setter={setPassword}
        placeholder="Write your password"
        type={"password"}
      />
      <div className={classes.rememberMeWrapper}>
        <Checkbox
          label="Remember Me"
          value={rememberMe}
          setValue={setRemeberMe}
          labelStyle={{ color: "var(--secondary-text-color) !important" }}
        />
        <Link href="/forgot-password" className="secondary-text">
          Forgot Password?
        </Link>
      </div>
      <Button
        onClick={submitHandler}
        customStyle={{ backgroundColor: "var(--secondary-color)" }}
      >
        Login
      </Button>
      <p className={classes.textCenter}>
        Don't have an account?{" "}
        <Link className="highlight" href="/signup">
          Sign up.
        </Link>
      </p>
    </>
  );
}
