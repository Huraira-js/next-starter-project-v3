import Link from "next/link";
import Image from "next/image";
import classes from "./AuthLayout.module.css";
import moment from "moment";

export default function AuthLayout({ children }) {
  return (
    <main className={classes.authlayoutMain}>
      <div className={classes.colOne}>
        <div className={classes.header}>
          <div className={classes.logo}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                quality={100}
                fill
                style={{ objectFit: "contain" }}
              />
            </Link>
          </div>
        </div>
        <div className={classes.formWrapper}>{children}</div>
        <div className={classes.footer}>
          <p>Copyright {moment().format("YYYY")}, All Right Reserved.</p>
          <div className={classes.links}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className={classes.seprator}>|</span>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className={classes.colTwo}>
        <Image
          src={"/images/map_image.png"}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </main>
  );
}
