import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
var server = process.env.API_URL;
// console.log("server var: ", server);

const Dashboard = () => {
  const initialstate = {
    events: [],
    isLoading: true,
    errorMessage: false,
  };

  const [data, setData] = useState(initialstate);

  useEffect(() => {
    // axios(server + "/dashboard", {
    //   withCredentials: true,
    // })
    //   .then((res) => {
    //     // console.log("dashboard data.leaguesList: ", res.data.leaguesList);
    //     console.log("dashboard res: ", res);

    //     if (res.data.status == "Success") {
    //       console.log("inside status success");
    //       setData({
    //         leagues: res.data.leaguesList,
    //         isLoading: false,
    //         errorMessage: false,
    //       });
    //     } else {
    //       throw res;
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("dash failed:", error);
    //     setData({
    //       isLoading: false,
    //       errorMessage:
    //         (error.data
    //           ? error.data.status
    //           : "No data loaded. Try logging in again.") || error.statusText,
    //     });
    //   });
    setData({
      isLoading: false,
      errorMessage: false,
    });
  }, []);

  if (data.isLoading) return "Loading...";
  if (data.errorMessage)
    return `Something went wrong in dashboard: ${data.errorMessage}`;

  if (data.events)
    return (
      <>
        <p>Dashboard content here.</p>
      </>
    );
  else
    return (
      <>
        <p className={`e-section__title`}>{data.name}</p>
        <p className={`e-section__title`}>Quick Start</p>
        <Hometiles leagues={false} />
        <p className={`u-align__text--center u-menu_text`}>
          Welcome. Create a league to see more info here.
        </p>
      </>
    );
};

// const Dashboard = (data) => {
//   // const [state, dispatch] = React.useReducer(reducer, initialState);
//   return (
//     <>
//       <p className="animated fadeIn">{data.name}</p>
//       <p className="animated fadeIn">Dashboard</p>
//     </>
//   );
// };

export default Dashboard;
