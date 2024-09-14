"use client";
import { useState } from "react";
import classes from "./SignupForm.module.css";
import { Row, Col } from "react-bootstrap";
import { Input } from "@/components/Core/Input";
import { Button } from "@/components/Core/Button";
import { BaseURL } from "@/config/apiUrl";
import { Post } from "../../../../axios/AxiosFunctions";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/Core/Checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiHeader } from "@/helper/HelperFunction";
export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [iAgree, setIAgree] = useState(false);
  const submitHandler = async () => {
    const params = {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      iAgree,
    };
    const response = await Post(BaseURL("/"), params, apiHeader());
    if (response !== undefined) {
      toast.success("Signup successfull");
      router.push("/login");
    }
  };
  return (
    <>
      <Row>
        <Col lg={6}>
          <div className={classes.spacingWrapper}>
            <Input
              value={firstName}
              setter={setFirsName}
              placeholder="John"
              label="First Name"
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className={classes.spacingWrapper}>
            <Input
              value={lastName}
              setter={setLastName}
              placeholder="Smith"
              label="Last Name"
            />
          </div>
        </Col>
        <Col lg={12}>
          <div className={classes.spacingWrapper}>
            <Input
              value={email}
              setter={setEmail}
              placeholder="example@example.com"
              label="Email"
            />
          </div>
        </Col>
        {/* <Col lg={6}>
          <div className={classes.spacingWrapper}>
            <Input
              value={phone}
              setter={setPhone}
              placeholder="Phone"
              label="Phone"
            />
          </div>
        </Col> */}
        <Col lg={12}>
          <div className={classes.spacingWrapper}>
            <Input
              value={password}
              setter={setPassword}
              placeholder="Password"
              label="Password"
            />
          </div>
        </Col>
        <Col lg={12}>
          <div className={classes.spacingWrapper}>
            <Input
              value={confirmPassword}
              setter={setConfirmPassword}
              placeholder="Confirm Password"
              label="Confirm Password"
            />
          </div>
        </Col>
        <Col lg={12}>
          <div className={classes.agreeWrapper}>
            <Checkbox
              value={iAgree}
              setValue={setIAgree}
              label="I Agree"
              labelStyle={{ display: "none" }}
            />
            <p className="secondary-text">
              I agree to the 
              <Link href="/terms-and-conditions" className="highlight">
                Terms of Use
              </Link>
               and{" "}
              <Link href="/privacy-policy" className="highlight">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </Col>
        <Col lg={12}>
          <div className={classes.actionWrapper}>
            <Button onClick={submitHandler} variant="tertiary">
              Next
            </Button>
          </div>
        </Col>
      </Row>
      <p className={classes.login}>
        Already have an account?{" "}
        <Link className="highlight" href="/login">
          Sign In
        </Link>
      </p>
    </>
  );
}
