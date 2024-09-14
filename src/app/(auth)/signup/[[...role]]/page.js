import classes from "./Signup.module.css";
import SignupForm from "./SignupForm";
import Link from "next/link";
export default function Signup({ params }) {
  const { role } = params; // undefined when not present
  return (
    <>
      <div className={classes.wrapper}>
        <h2 className={classes.formHeading}>Register</h2>
        <SignupForm />
      </div>
    </>
  );
}
