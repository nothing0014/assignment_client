import React from "react";

const HeaderComponent = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <img
          src="https://www.lndata.com/images/logo/logo_160.png"
          alt="lndata_img"
        />
      </div>

      <div>
        <img
          width="100%"
          height="100%"
          src="https://img.icons8.com/material-sharp/48/user-male-circle.png"
          alt="avatar_img"
        />
      </div>
    </div>
  );
};

export default HeaderComponent;
