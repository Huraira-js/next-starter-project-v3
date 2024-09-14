"use client";

import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { AfterLoginHeader } from "@/components/Header/AfterLoginHeader";
import SideBar from "../SideBar";
import Drawer from "react-modern-drawer";
import classes from "./SideBarSkeleton.module.css";
import Link from "next/link";
import { isMobileViewHook } from "@/customHooks/isMobileViewHook";
import moment from "moment";
import { usePathname, useParams } from "next/navigation";
import { interpolateString } from "@/helper/HelperFunction";

const SideBarSkeleton = ({ children, footerVisible = false }) => {
  const pathname = usePathname();
  const { slug } = useParams();
  const splitBySlashPathname = pathname.split("/");
  const pathNameLast = splitBySlashPathname[splitBySlashPathname?.length - 1];
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  useEffect(() => {
    isMobileViewHook(setIsMobile);
  }, []);
  const header = {
    "edit-points": "Project: {slug}",
  };
  return (
    <>
      <style>{`
        .drawerContainer{
          width:320px !important;
        }
        @media (max-width:768px){
          .drawerContainer{
            width:290px !important;
          }
        }
    `}</style>
      <Container fluid className="g-0" style={{ backgroundColor: "#fafafa" }}>
        <div className={`${classes.wrapper} g-0`}>
          <div
            className={[
              !isMobile ? classes.sidebarDiv : classes.sidebarOnMobileDiv,
              isCollapsed ? classes.iscollapsed : "",
            ].join(" ")}
          >
            {!isMobile ? (
              <SideBar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            ) : (
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
                className="drawerContainer"
              >
                <SideBar
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                />
              </Drawer>
            )}
          </div>
          <div
            className={[
              !isMobile ? classes.contentDiv : classes.contentOnMobileDiv,
              isCollapsed ? classes.contentIsCollapsed : "",
            ].join(" ")}
          >
            <AfterLoginHeader
              drawerBtn={
                isMobile && (
                  <GiHamburgerMenu
                    className={[classes.GiHamburgerMenuMobile]}
                    onClick={() => {
                      toggleDrawer();
                    }}
                  />
                )
              }
              header={interpolateString(header[pathNameLast], { slug: slug })}
            />
            <div className={classes.pageMain}>{children}</div>
          </div>
          {footerVisible && (
            <div className={classes.footer}>
              <p>Copyright {moment().format("YYYY")}, All Rights Reserved</p>
              <div className={classes.links}>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <span className={classes.seprator}></span>
                <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default SideBarSkeleton;
