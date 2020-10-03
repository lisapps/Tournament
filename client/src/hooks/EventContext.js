import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";
import { getCookie, setCookie } from "../libs/cookie";
import dotenv from "dotenv";

dotenv.config();
var server = process.env.API_URL;
const bes = process.env.BES;
let eventarr = [];
export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const CHANGE_EVENT = "CHANGE_EVENT";
  const FROM_COOKIE = "FROM_COOKIE";

  const reducer = (selectedEvent, action) => {
    if (action.type === CHANGE_EVENT) {
      selectedEvent = action.payload.newEvent;
      // setCookie("currentEid", selectedEvent[0].value, 1);
    }
    if (action.type === FROM_COOKIE) {
      selectedEvent = action.payload.newEvent;
    }

    return selectedEvent;
  };

  const [eventData, setEventData] = useState(null);
  const [selectedEvent, dispatch] = useReducer(reducer, null);

  function getFromCookie(eId) {
    // var lId = getCookie("currentLid");
    if (eId) {
      var eOjb = eventData.find((x) => x.value === eId);
      var newEvent = [];
      newEvent.push(eOjb);
      // function from context
      dispatch({
        type: FROM_COOKIE,
        payload: { newEvent },
      });
    }
  }

  const changeEvent = useCallback((newEvent) => {
    console.log(newEvent);
    dispatch({
      type: CHANGE_EVENT,
      payload: { newEvent },
    });
  }, []);

  useEffect(() => {
    axios(server + "/dashboard", {
      withCredentials: true,
    })
      .then((res) => {
        console.log("Main data.leaguesList: ", res.data.leaguesList);

        if (res.data.status == "Success") {
          // const bes = "https://avp-backend.com/";
          // let edata = res.data.leaguesList;
          // edata = edata.flat();
          // edata.map((item) => {
          //   const egobj = {
          //     value: item.eventId,
          //     content: item.eventName,
          //     icon: bes + item.eventIcon,
          //     eventStatus: item.eventStatus,
          //   };
          //   eventarr.push(egobj);
          // });
          // setEventData(eventarr);
          // console.log("event data set");
        } else {
          throw res;
        }
      })
      .catch((error) => {
        console.error("event state failed:", error);
      });
  }, []);

  useEffect(() => {
    if (eventData && eventData.length > 0) {
      var eId = getCookie("currentEid");
      // console.log("selected event checking cookie: ", eId);
      eId ? getFromCookie(eId) : changeEvent([eventarr[0]]);
    }
  }, [eventData]);

  const value = { eventData, selectedEvent, changeEvent };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
