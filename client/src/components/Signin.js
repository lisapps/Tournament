import React from "react";
import { AuthContext } from "../App";
import axios from "axios";

export const Signin = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    emailId: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    // fetch("http://localhost:3002/signin", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     username: data.emailId,
    //     password: data.password
    //   })
    // })
    //   .then(res => {
    //     // if (res.ok) {
    //     //   console.log("inside react res.ok");
    //     //   return res.json();
    //     // }
    //     // console.log("got throw res in react");
    //     // throw res;
    //     console.log("res: ", res);
    //   })
    //   .then(resJson => {
    //     dispatch({
    //       type: "LOGIN",
    //       payload: resJson
    //     });
    //   })
    //   .catch(error => {
    //     console.log("fetch error in react: ", error);
    //     // console.log("data: ", data);
    //     console.log("error.message: ", error.message);
    //     console.log("error.statusText: ", error.statusText);
    //     setData({
    //       ...data,
    //       isSubmitting: false,
    //       errorMessage: error.message || error.statusText
    //     });
    //   });

    axios({
      method: "post",
      url: "http://localhost:3002/signin",
      data: {
        username: data.emailId,
        password: data.password
      }
    })
      .then(res => {
        console.log("res: ", res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <section className={`l-content l-content--signin`}>
      <div className={`l-content__row`}>
        <div className={`c-card_large u-card c-signin-form`}>
          <div className="e-signinLogo">
            <p className={`e-greet.u-align__text--center`}>HELLO!</p>
            <form id="e-signin-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="emailId"
                placeholder="Email"
                value={data.emailId}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
                required
              />
              {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}
              <button
                className={`e-btn--lg u-align__button--center`}
                disabled={data.isSubmitting}
              >
                {data.isSubmitting ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="l-content__row">
        <p className="e-cookieMsg">
          *Please note that cookies must be enabled for this site to work
          properly.
        </p>
      </div>
    </section>
  );
};

export default Signin;
