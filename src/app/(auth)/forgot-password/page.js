import classes from "./ForgotPassword.module.css";
import ForgetPasswordForm from "./ForgotPasswordForm";
export default function ForgotPassword() {
  return (
    <>
      <div className={classes.wrapper}>
        <h3 className={classes.formHeading}>Forgot Password</h3>
        <ForgetPasswordForm />
      </div>
    </>
  );
}
