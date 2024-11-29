import React from "react";
import styles, { layout } from "../style";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`${layout.sectionInfo} ${styles.flexCenter}`}>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
