import React from "react";
import "./Footer.css";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
function Footer() {
  return (
      <footer>
          <div className="footer">
      <div>
        <p>© 2022 Yash Ajmeri   |</p>
      </div>
      <div>
        <p>
          <a href="https://www.linkedin.com/in/yash-ajmeri-2091301b1/">
            <BsLinkedin className="footer-icons" />{" "}
          </a>
          <a href="https://github.com/yashajmeri">
            <BsGithub className="footer-icons" />{" "}
          </a>

          <a href="https://www.instagram.com/yash_ajmeri13/">
            <BsInstagram className="footer-icons" />
          </a>
        </p>
      </div>
    </div>
      </footer>
    
  );
}

export default Footer;
