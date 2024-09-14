import React, { useState } from "react";
import Style from "./AfterLoginHeader.module.css";
import { Container, OverlayTrigger } from "react-bootstrap";
import { AiFillBell } from "react-icons/ai";
import { useSelector } from "react-redux";
import { profile } from "../../constant/imagePath";
import { imageUrl } from "../../config/apiUrl";
import HeaderNotification from "../HeaderNotification/HeaderNotification";
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCog } from "react-icons/fa";
import { MdOutlineOfflineBolt } from "react-icons/md";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";

export const AfterLoginHeader = ({ className, header, drawerBtn }) => {
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
  const [profileOverlay, setProfileOverlay] = useState(false);
  const router = useRouter();
  return (
    <div className={`${[Style.navbarContainer, className].join(" ")}`}>
      {drawerBtn && drawerBtn}
      {header && <p className={Style.heading}>{header}</p>}
      <div
        className={`${[Style.iconDiv].join(" ")} ${
          Style["notification-header"]
        }`}
      >
        <OverlayTrigger
          placement={"bottom-end"}
          show={showNotificationOverlay}
          trigger={["click"]}
          overlay={
            <div className={`${[Style.notifyoverlayDiv]}`}>
              <HeaderNotification />
            </div>
          }
          // onToggle={() => setShowNotificationOverlay(!showNotificationOverlay)}
        >
          <AiFillBell size="20px" />
        </OverlayTrigger>
      </div>

      <OverlayTrigger
        placement={"bottom-end"}
        show={profileOverlay}
        trigger={["click"]}
        overlay={
          <div className={Style.linkWrapper}>
            <Link href="/subscriptions">
              <MdOutlineOfflineBolt />
              Subscription Plan
            </Link>
            <Link href="/settings">
              <FaCog /> Settings
            </Link>
          </div>
        }
        onToggle={() => {
          setProfileOverlay((prev) => !prev);
        }}
      >
        <div className={Style["profile-container"]}>
          <div className={`${[Style.profileImg]} ${Style["profile-wrapper"]}`}>
            <Image src={"/images/user.png"} alt="..." layout="fill" />
          </div>
          <p className={Style["profile-name"]}>
            User
            {profileOverlay ? (
              <HiMiniChevronUp
                size={20}
                color="var(--secondary-color)"
                style={{ lineHeight: "1" }}
              />
            ) : (
              <HiMiniChevronDown
                size={20}
                color="var(--secondary-color)"
                style={{ lineHeight: "1" }}
              />
            )}
          </p>
        </div>
      </OverlayTrigger>
    </div>
  );
};
