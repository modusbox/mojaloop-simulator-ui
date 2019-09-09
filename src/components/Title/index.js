import React from "react";

const Title = ({ children, small }) => (
  <div style={{ fontSize: small ? "16px" : "24px", fontWeight: "normal", marginBottom: small ? "10px" : "20px" }}>
    {children}
  </div>
);

export default Title;
