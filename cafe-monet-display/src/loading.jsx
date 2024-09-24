"use-client";

import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [calendarId, setCalendarId] = useState();
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
    Cookies.set("calendarId", calendarId);
    navigate("/calendars", {state: calendarData});
  }

  const getCalendarList = async (accessToken) => {
    const tempCalendarList = [];
    const calendarListData = await fetch(
      `https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${accessToken}`
    ).catch(error => console.log(error));

    while(calendarListData.items) {
      let newCal = calendarListData.items.pop();
      if (!newCal) break;

      let newCalButton = ( 
        <button onClick={() => setCalendarId(newCal.id)} className="calendarButton">
          {newCal.summary}
        </button> 
      );
      
      tempCalendarList.push(newCalButton);
      console.log(`read new calendar ${newCal.summary} with id: ${newCal.id}`);
    }

    setCalendarList(tempCalendarList);
    setIsLoading(!isLoading);
  }

  // for getting the calendar list
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      navigate("/");
    } else {
      setCalendarList([]);
      getCalendarList(accessToken);
    }
  }, [navigate, calendarId]);

  return (
    <>
      {isLoading ? <p>Loading...</p> : <div class="accent-bar">
          <ul class="accents">
            {calendarList}
          </ul>
      </div>}
    </>
  );
}