import classes from "./Login.module.css";
import LoginForm from "./Login";
export default function Login() {
  return (
    <>
      <div className={classes.wrapper}>
        <h2 className={classes.formHeading}>Sign In</h2>
        <p className={classes.formDescription}>
          Fill the fields below to continue
        </p>
        <LoginForm />
      </div>
    </>
  );
}
