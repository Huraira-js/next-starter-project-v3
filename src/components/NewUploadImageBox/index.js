"use client";
import React, { useRef } from "react";
import { MdUpload, MdModeEdit, MdClose } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import classes from "./UploadImageBox.module.css";
import { Button } from "../Button";
import { CiImageOn } from "react-icons/ci";

function UploadImageBox({
  state,
  setter,
  label,
  edit = true,
  onDelete,
  onClose,
  isCloseable,
  hideDeleteIcon = false,
  imgClass,
  containerClass = "",
  onEdit,
  description,
  boxWidth,
}) {
  const inputRef = useRef(null);
  return (
    <div>
      {label && <label className={classes.label}>{label}</label>}

      <div className={`${classes.box} ${containerClass}`}>
        <div className={classes.uploadImageBox} style={{ maxWidth: boxWidth }}>
          {/* Close Icon */}
          {isCloseable && (
            <span className={classes.closeIcon} onClick={onClose}>
              <MdClose />
            </span>
          )}
          {state?.name || typeof state == "string" ? (
            <div className={classes.imageUploaded}>
              <img
                src={
                  typeof state == "object" ? URL.createObjectURL(state) : state
                }
                className={imgClass ? imgClass : ""}
                alt="New Product"
              />
            </div>
          ) : (
            <div className={classes.icon}>
              <CiImageOn size={48} color="var(--border-color)" />
            </div>
          )}
        </div>
        <div
          className={classes.uploadBox}
          onClick={() => inputRef.current.click()}
        >
          <Button variant="tertiary">Upload</Button>
          {description && <p>{description}</p>}
        </div>

        <input
          hidden
          type={"file"}
          ref={inputRef}
          onChange={(e) => setter(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default UploadImageBox;
