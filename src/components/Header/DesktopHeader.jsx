"use-client";
import React, { useEffect, useRef, useState } from "react";
import { Container, Navbar, OverlayTrigger, Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/Core/Button";
import Style from "./DesktopHeader.module.css";
import Image from "next/image";
import {
  FaChevronDown,
  FaFacebook,
  FaInstagram,
  FaRegBell,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import PopperComponent from "../PopperComponent";
import SearchInput from "../SearchInput";
const DesktopHeader = ({
  logo = "/images/logo.png",
  backgroundColor,
  containerClass,
  className,
  links,
  HeaderButtons,
  searchOptions = [
    { label: "All", value: "all" },
    { label: "Lastest", value: "latest" },
  ],
  setShowSignUpModal,
  setShowSignInModal,
}) => {
  const router = useRouter();
  const loginRef = useRef(null);
  const linksRef = useRef(null);
  const [loginPopper, setLoginPopper] = useState(false);
  const [linksPopper, setLinksPopper] = useState({ open: false, value: "" });
  const [search, setSearch] = useState("");
  const isLogin = false;
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const user = {
    photo: "/images/user-avatar.png",
    name: "John Doe",
  };
  const logout = () => {
    router.push("/");
  };

  return (
    <>
      <Container
        className={`${[Style.navbarContainer, containerClass].join(
          " ",
        )} mainContainer`}
      >
        <Navbar
          collapseOnSelect
          expand="lg"
          className={`${[Style.header, className].join(" ")}`}
          style={{ backgroundColor: backgroundColor }}
          id={"navDesktopHeader"}
        >
          <div className={Style.logo__wrapper}>
            <div
              className={Style.main_logo_main}
              onClick={() => router.push("/")}
            >
              <Image
                src={logo}
                alt="Logo"
                style={{ objectFit: "contain", objectPosition: "left" }}
                fill
              />
            </div>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className={Style.navbarCollapse}
            id="responsive-navbar-nav"
          >
            <Nav
              className={`mx-auto ${[Style.navbarCustom__style].join(" ")}`}
              gap={5}
            >
              {links[isLogin ? "loggedIn" : "loggedOut"]?.map((item, index) => (
                <>
                  {item?.subMenu ? (
                    <span
                      className={
                        pathname === item?.value
                          ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                          : `${[Style.nabarLinks]}`
                      }
                      ref={
                        item?.value === linksPopper?.value ? linksRef : linksRef
                      }
                      onClick={() => {
                        setTimeout(() => {
                          setLinksPopper((prev) => ({
                            open: !prev?.open,
                            value: item?.value,
                          }));
                        }, 100);
                      }}
                    >
                      {item?.label}
                      <FaChevronDown size={12} className={Style.chevDown} />
                    </span>
                  ) : (
                    <Link
                      key={index}
                      href={item?.value}
                      className={
                        pathname === item?.value
                          ? `${[Style.nabarLinks, Style.navActive].join(" ")}`
                          : `${[Style.nabarLinks]}`
                      }
                    >
                      {item?.label}
                    </Link>
                  )}
                </>
              ))}
              {/*               <SearchInput value={search} setSearch={setSearch} /> */}
            </Nav>
            <div className={Style.dflex}>
              <div className={Style.btnMain}>
                {HeaderButtons.map((button, index) => (
                  <Link href={button?.value} key={index}>
                    <Button
                      variant={
                        HeaderButtons.length - 1 === index
                          ? "bordered"
                          : "primary"
                      }
                      leftIcon={button?.icon}
                      isHover
                    >
                      {button?.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <PopperComponent
        open={linksPopper.open}
        setOpen={() => setLinksPopper({ open: false, value: "" })}
        anchorRef={linksRef}
        placement="bottom-end"
        spaceBetweenRef={linksPopper.open ? "0.8rem" : "0"}
        popperInsideElement={
          <div className={Style.linksWrapper}>
            {links[isLogin ? "loggedIn" : "loggedOut"]
              ?.find((e) => e?.value === linksPopper?.value)
              ?.subMenu?.map((link, index) => (
                <>
                  <Link href={link?.value} key={index}>
                    {link?.label}
                  </Link>
                </>
              ))}
          </div>
        }
      />
      <PopperComponent
        open={loginPopper}
        setOpen={setLoginPopper}
        anchorRef={loginRef}
        placement="bottom-end"
        spaceBetweenRef={loginPopper ? "0.8rem" : "0"}
        popperInsideElement={
          <div className={Style.loginPopperWrapper}>
            <span onClick={() => setShowSignInModal(true)}>Login</span>
            <span onClick={() => setShowSignUpModal(true)}>Signup</span>
            <div className={Style.socialWrapper}>
              <Link href="https://www.facebook.com" target="_blank">
                <FaFacebook />
              </Link>
              <Link href="https://www.twitter.com" target="_blank">
                <FaTwitter />
              </Link>
              <Link href="https://www.instagram.com" target="_blank">
                <FaInstagram />
              </Link>
              <Link href="https://www.youtube.com" target="_blank">
                <FaYoutube />
              </Link>
            </div>
          </div>
        }
      />
    </>
  );
};

export default DesktopHeader;
