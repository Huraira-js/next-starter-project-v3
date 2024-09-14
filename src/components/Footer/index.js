import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import moment from "moment/moment";
import classes from "./Footer.module.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaEnvelope,
} from "react-icons/fa6";
import { FaMapMarker, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import ShowMoreShowLessText from "../Core/ShowMoreShowLess";

const Footer = ({ mainWrapper }) => {
  const links = {
    quickLinks: [
      {
        label: "Home",
        value: "/",
      },
      {
        label: "About",
        value: "/about",
      },
      {
        label: "Service Providers",
        value: "/service-provider",
      },
      {
        label: "FAQs",
        value: "/faqs",
      },
      {
        label: "Contact",
        value: "/contact",
      },
    ],
    contactUs: [
      {
        value: "mailto:johndoe@gmail.com",
        label: "johndoe@gmail.com",
        icon: <FaEnvelope />,
      },
      { value: "tel:123456789", label: "123-456-789", icon: <FaPhoneAlt /> },
      {
        value: "#",
        label: "180 Montgomery St, Suite 650 San Francisco, CA 94104, USA",
        icon: <FaMapMarker />,
      },
    ],
    MyAccount: [
      {
        value: "/contact",
        label: "Contact Us",
      },
    ],
    socialLinks: [
      {
        label: "facebook",
        value: "https://www.facebook.com",
        icon: <FaFacebook />,
      },
      {
        label: "twitter",
        value: "https://www.twitter.com",
        icon: <FaTwitter />,
      },
      {
        label: "instagram",
        value: "https://www.instagram.com",
        icon: <FaInstagram />,
      },
      {
        label: "google",
        value: "https://www.google.com",
        icon: <FaGoogle />,
      },
    ],
  };

  return (
    <>
      <div className={`${[classes.footerMain, mainWrapper].join(" ")}`}>
        <div className={classes.footer__wrapper}>
          <Container>
            <div className={classes.grid__wrapper}>
              <div className={classes.descriptionWrapper}>
                <div className={classes.logo__wrapper}>
                  <Image
                    src="/images/logo.png"
                    height={54}
                    width={217}
                    style={{ objectFit: "contain" }}
                    quality={100}
                  />
                </div>
                <ShowMoreShowLessText
                  text={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula orci eu lorem faucibus blandit congue ac erat. Proin at arcu dictum, condimentum eros nec, dapibus massa. Aliquam sollicitudin convallis eros eget ornare. Nulla facilisi. Fusce gravida vulputate eros, et dapibus sem maximus vitae. Aenean sollicitudin lacus nec urna volutpat maximus. Phasellus placerat odio turpis, non tempus massa dictum at. Quisque varius sapien tincidunt, ornare erat vel, vestibulum urna. In egestas, dolor eget faucibus molestie, nisi urna hendrerit nisl, finibus aliquet massa mauris id libero. Sed pharetra, orci vitae dapibus pellentesque, quam justo ultricies dolor, at ultricies odio diam dignissim velit. Pellentesque sed nibh sit amet justo congue commodo. Praesent lobortis lorem dapibus, maximus diam eu, interdum mauris."
                  }
                  visibility={100}
                  isButton
                  buttonProps={{ isHover: true }}
                />
              </div>
              <div className={classes.links__wrapper}>
                <div className={classes.links}>
                  <h6 className="bold">Quick Links</h6>
                  {links["quickLinks"].map((link, index) => (
                    <Link
                      href={link?.value}
                      key={index}
                      className={classes.link}
                    >
                      {link?.label}
                    </Link>
                  ))}
                </div>
                <div className={classes.links}>
                  <h6 className="bold">Contact Info</h6>
                  {links["contactUs"].map((link, index) => (
                    <Link
                      href={link?.value}
                      key={index}
                      className={classes.link}
                      target="_blank"
                    >
                      {link?.icon} {link?.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className={classes.social__links}>
                <h6 className="bold">Subcribe To Our Newsletter</h6>
                <div className={classes.social__links__wrapper}>
                  <span>
                    <FaFacebook color="var(--main-color)" size={22} />
                  </span>
                  <span>
                    <FaTwitter color="var(--main-color)" size={22} />
                  </span>
                  <span>
                    <FaInstagram color="var(--main-color)" size={22} />
                  </span>
                  <span>
                    <FaYoutube color="var(--main-color)" size={22} />
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <div className={classes.bottom__wrapper}>
            <p>&copy; {moment().format("YYYY")}, All Rights Reserved.</p>
            <div className={classes.bottom__links}>
              <Link href="/privacy-policy">Privacy Policy </Link>
              <span>|</span>
              <Link href="/terms-and-conditions">Terms & Condition</Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
