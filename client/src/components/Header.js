import React, { useState, useEffect } from "react";
import { AuthContext } from "../App";
import person from "../../public/images/icons/icons-photo-person.svg";

const Header = () => {
  const { loginState, dispatch } = React.useContext(AuthContext);
  const [iconState, setIcon] = useState(person);

  // useEffect to change icon to user's icon if it's not ""
  useEffect(() => {
    console.log("loginState.pic:", loginState.pic);
    if (loginState.pic !== "") setIcon(loginState.pic);
  }, [loginState]);
  //
  return (
    <section className="c-header">
      <div className="c-header__right">
        <div className="c-account">
          <div className="c-login">
            <img className="u-img-rounded" src={iconState} />
            <span href="/">
              {loginState.firstName
                ? `Hi, ` + loginState.firstName + ` ` + loginState.lastName
                : `Hi, User`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
