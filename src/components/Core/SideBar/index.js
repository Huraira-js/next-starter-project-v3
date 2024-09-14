"use client";
import { cloneElement, useState, useRef } from "react";
import classes from "./SideBar.module.css";
import { signOutRequest } from "@/store/auth/authSlice";
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiBillLine,
  RiNumber5,
} from "react-icons/ri";
import { Button } from "../Button";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IoChevronForward, IoHomeOutline } from "react-icons/io5";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { GoStack } from "react-icons/go";
import { MdOutlineOfflineBolt } from "react-icons/md";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import PopperComponent from "../PopperComponent";
import { useRouter } from "next/navigation";

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const popperRef = useRef(null);
  const router = useRouter();
  const [popper, setPopper] = useState(false);
  const pathname = usePathname();
  const role =
    pathname.split("/").includes("customer") ||
    pathname.split("/").includes("contractor")
      ? pathname.split("/")?.[1]
      : null;

  const [notificationModal, setNotificationModal] = useState();
  // const socket = io(apiUrl);

  const HandleSubmitSignOut = () => {
    // socket.emit("logout", userData?._id, fcmToken);
    dispatch(signOutRequest());
    navigate("/login");
  };

  const handlePopperClick = (flag) => {
    console.log(flag?.value, popper?.data);
    const linkToRedirect = popper?.data?.find((e) => e?.title === flag?.value);
    if (linkToRedirect) {
      router.push(linkToRedirect?.path);
    }
  };

  const Links = [
    // {
    //   title: "Dashboard",
    //   path: "/dashboard",
    //   icon: <IoHomeOutline />,
    // },
    {
      title: "Projects",
      path: "/projects",
      icon: <GoStack />,
    },
    {
      title: "Billing",
      path: "/billing",
      icon: <RiBillLine />,
    },
  ];

  return (
    <>
      <div className={classes?.mainContainer}>
        <div className={classes?.logoContainer}>
          <div className={classes.logo}>
            {isCollapsed ? (
              <Image
                src={"/images/logo.png"}
                layout="fill"
                objectFit="contain"
                style={{ paddingInline: "1rem" }}
              />
            ) : (
              <Image
                src={"/images/logo.png"}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <div
            className={classes.toggler}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <IoChevronForward
              className={!isCollapsed ? classes.toggleIcon : ""}
            />
          </div>
        </div>
        <div className={classes.itemsContainer}>
          {Links?.map((item, index) => {
            return (
              <RenderItem
                icon={item?.icon}
                title={item?.title}
                path={item?.path}
                subMenu={item?.subMenu}
                isCollapsed={isCollapsed}
                key={index}
                popperRef={popperRef}
                setPopper={setPopper}
              />
            );
          })}
          <Button
            className={[
              classes["logout-btn"],
              isCollapsed ? classes.logoutCollapsed : "",
            ].join(" ")}
            onClick={HandleSubmitSignOut}
            variant="secondary"
            isSimpleHover
          >
            <LuLogOut size={25} className={classes.icon} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
      {popper?.show && (
        <PopperComponent
          anchorRef={popperRef}
          open={popper?.show}
          setOpen={() => {
            setPopper(() => ({ show: false, data: null }));
          }}
          data={popper?.data?.map((item) => ({ value: item?.title }))}
          placement="right"
          handleClick={handlePopperClick}
          spaceBetweenRef={"0 0 0 1rem"}
        />
      )}
    </>
  );
};

export default SideBar;

const RenderItem = ({
  icon,
  title,
  subMenu = [],
  path,
  isCollapsed,
  popperRef,
  setPopper,
}) => {
  const pathname = usePathname();
  const active = pathname === path ? true : false;
  const [subnav, setSubnav] = useState(false);
  const subActive = subMenu.some((item, index) => item?.path == pathname);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <Link
        className={[
          classes?.listItemContainer,
          (active || subnav) && classes?.active,
          subActive && classes?.subActive,
          subnav && classes?.marginZero,
          isCollapsed ? classes.isCollapsed : "",
        ].join(" ")}
        href={subMenu?.length > 0 ? "#" : path}
        onClick={() => {
          if (subMenu?.length > 0) {
            showSubnav(!subnav);
          }
          isCollapsed &&
            subMenu?.length > 0 &&
            setPopper((prev) => ({ ...prev, show: true, data: subMenu }));
        }}
        ref={subnav ? popperRef : null}
      >
        {cloneElement(icon, {
          size: 20,
          color: "inherit",
          className: classes.icon,
        })}
        {!isCollapsed && <span>{title}</span>}
        {subMenu?.length > 0 &&
          (subnav ? (
            <FiChevronUp size={20} className={classes?.dropDownIcon} />
          ) : (
            <FiChevronDown size={20} className={classes?.dropDownIcon} />
          ))}
      </Link>
      {!isCollapsed && subnav && (
        <div className={classes.subMenu}>
          {subMenu.map((item, index) => {
            return (
              <Link
                className={[
                  classes?.innerItemContainer,
                  pathname === item?.path && classes?.active,
                ].join(" ")}
                key={index}
                href={item?.path}
              >
                <span>{item?.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};
