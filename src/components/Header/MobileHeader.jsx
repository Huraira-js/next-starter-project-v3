import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./MobileHeader.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Link from 'next/link'
export const MobileHeader = ({
  customStyle,
  logo = "/images/logo.png",
  links,
  HeaderButtons,
}) => {
  const router = useRouter();
  const isLogin = false;
  const user = {
    photo: "/images/user-avatar.png",
  };

  // current page url path name
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('')
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const logout = () => {
    router.push("/");
  };


  return (
    <>
      <div className={classes.headerMainDiv} id={"navMobileHeader"}>
        <div className={classes.header} style={{ ...customStyle }}>
          <div className={classes.imageContainer} onClick={() => router.push('/')}>
            <Image
              src={logo}
              className={classes.logo}
              alt="logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          {/*           <SearchInput value={search} setter={setSearch} /> */}
          <div className={classes.languageDropDownDiv}>
            <GiHamburgerMenu
              className={classes.hamburger}
              onClick={() => {
                toggleDrawer();
              }}
              fill={"var(--main-color)"}
            />
          </div>
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className={classes.drawer}
        >
          <div className={classes.drawerContainer}>
            <div className={classes.drawerUserSection}>
              <div className={classes.drawerUserImage}>
                <Image
                  src={logo}
                  className={classes.drawerLogo}
                  alt="logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <div className={classes.drawerList}>
              <>
                {links[isLogin ? "loggedIn" : "loggedOut"]?.map(
                  (item, index) => (
                    <RenderListItem
                      key={index}
                      icon={item?.icon && item?.icon}
                      text={item?.label}
                      // customClass={
                      //   currentPage == item?.value && classes.activeItem
                      // }
                      path={item?.value}
                      subMenu={item?.subMenu}
                    />
                  ),
                )}

                <hr
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                  }}
                />
                {isLogin ? (
                  <>
                    <RenderListItem text={"Cart"} path={"cart"} />
                    <RenderListItem text={"logout"} path={"logout"} />
                  </>
                ) : (
                  <>
                    {HeaderButtons?.map((item, index) => (
                      <RenderListItem
                        key={index}
                        text={item?.label}
                        path={item?.value}
                      />
                    ))}
                  </>
                )}
              </>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

const RenderListItem = ({ icon, text, customClass, path, href, onClick, subMenu }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  return (
    <>
      <div
        className={[classes.listItem, customClass].join(" ")}
        onClick={() => {
          if (subMenu) {
            setIsOpen(prev => !prev)
            return
          }
          if (onClick) {
            onClick(text);
            return;
          }
          if (path.toLowerCase() == "logout") {
            logout();
          } else {
            router.push(path);
          }
        }}
      >
        {icon}
        <span className={classes.listItemText}>{text}{subMenu ? isOpen ? <span className={classes.icon}><FaChevronUp size={12} /></span> : <span className={classes.icon}><FaChevronDown size={12} /></span> : ""}</span>
      </div>
      {
        isOpen && <div className={classes.subMenu}>{subMenu?.map((link, index) => (
          <Link href={link?.value} key={index}>{link?.label}</Link>
        ))}</div>
      }
    </>
  );
};

MobileHeader.propTypes = {
  customStyle: PropTypes.object,
};

MobileHeader.defaulProps = {};
