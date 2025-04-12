import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <div className="mt-5 text-secondary text-center py-4 px-5" style={{ fontSize: "0.8rem", borderTop: "1px solid #334155" }}>
      <p>&copy; 2025 SideQuest, All Rights Reserved</p>
      <p className="mb-0">Remember: adventure responsibly and respect your surroundings</p>
    </div>
  );
}

export default Footer;
