"use client";
import React, { useState, useEffect } from "react";
import { isMobileViewHook } from "../../customHooks/isMobileViewHook";
import DesktopHeader from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import PropTypes from "prop-types";
import { MdLock } from "react-icons/md";
import classes from "./Header.module.css";
import { FaUser } from "react-icons/fa6";
const Header = ({
  backgroundColor,
  containerClass,
  className,
  logo,
  customStyle,
  headerClassName,
}) => {
  const links = {
    loggedOut: [
      {
        label: "Home",
        value: "/",
      },
      {
        label: "About",
        value: "/about",
      },
      {
        label: "Services Providers",
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
    loggedIn: [
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
  };
  const HeaderButtons = [
    {
      label: "Sign Up",
      value: "/signup",
      icon: <FaUser size={12} />,
    },
    {
      label: "Login",
      value: "/login",
      icon: <MdLock size={14} />,
    },
  ];
  const [isMobile, setIsMobile] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPerc = parseInt((window.scrollY * 100) / maxHeight);
      if (window.scrollY > 117) setSticky(true);
      else setSticky(false);
    });
    isMobileViewHook(setIsMobile, 992);
    return () => {
      document.removeEventListener("scroll", () => {});
    };
  }, []);
  useEffect(() => {
    isMobileViewHook(setIsMobile, 992);
  }, []);

  return (
    <>
      <header
        style={{
          ...(isSticky && {
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            animation: "headerInAnimation 0.2s ease-in forwards",
          }),

          ...(!isSticky && {
            position: "relative",
          }),
          zIndex: 99,
        }}
        className={[headerClassName, isSticky ? classes.stickyClass : ""].join(
          " ",
        )}
      >
        {isMobile ? (
          <MobileHeader
            logo={logo}
            customStyle={customStyle}
            links={links}
            HeaderButtons={HeaderButtons}
            showSignUpModal={showSignUpModal}
            setShowSignUpModal={setShowSignUpModal}
            showSignInModal={showSignInModal}
            setShowSignInModal={setShowSignInModal}
          />
        ) : (
          <DesktopHeader
            logo={logo}
            // searchOptions={searchParams}
            backgroundColor={backgroundColor}
            containerClass={containerClass}
            className={className}
            links={links}
            HeaderButtons={HeaderButtons}
            showSignUpModal={showSignUpModal}
            setShowSignUpModal={setShowSignUpModal}
            showSignInModal={showSignInModal}
            setShowSignInModal={setShowSignInModal}
          />
        )}
      </header>
    </>
  );
};

export default Header;

Header.propTypes = {
  backgroundColor: PropTypes.string,
  containerClass: PropTypes.string,
  className: PropTypes.string,
  logo: PropTypes.object,
  customStyle: PropTypes.object,
};
