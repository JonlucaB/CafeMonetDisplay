"use-client";

import { useEffect, useState } from "react";
import ActivityIndicator from "react-native";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
       + pad(d.getUTCMonth()+1)+'-'
       + pad(d.getUTCDate())+'T'
       + pad(d.getUTCHours())+':'
       + pad(d.getUTCMinutes())+':'
       + pad(d.getUTCSeconds())+'Z'}

export default function Loading() {
  const navigate = useNavigate();
  const [calendarId, setCalendarId] = useState("");
  const [calendarList, setCalendarList] = useState([]);

  const getCalendarData = async (accessToken, calID) => {
    const timeMin = new Date();
    const timeMax = new Date();
    timeMin.setHours(11, 0, 0, 0);
    timeMax.setHours(20, 0, 0, 0);
    const calendarData = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calID}]/events?access_token=${accessToken}`
        +`%2C`+ISODateString(timeMax)+"%3A"
        +`%2C`+ISODateString(timeMin)+"%3A"
    ).catch(error => console.log(error));

    Cookies.set("events", calendarData);
    console.log(calendarData);
    navigate("/calendars", {state: calendarData});
  }

  const getCalendarList = async (accessToken) => {
    const tempCalendarList = [];
    const calendarListData = await fetch(
      `https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${accessToken}`
    ).catch(error => console.log(error));

    while(calendarListData) {
      let newCal = calendarListData.pop();
      let newCalButton = <Button
        onClick={() => setCalendarId(newCal.id)}
        className="calendarButton"
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ["#FF9800", "#F44336"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        >
          {newCal.summary}
        </Button>;
      
      tempCalendarList.push(newCalButton);
    }

    setCalendarList(tempCalendarList);
  }



  useEffect(() => {
    getCalendarData(accessToken, calendarId)
  }, [calendarId])

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      navigate("/");
    }

    getCalendarList(accessToken);
  }, [navigate]);

  return (
    <>
      {!calendarList ? <ActivityIndicator size="large" color="#ffc4e4" /> : calendarList}
    </>
  );
}