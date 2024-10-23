"use-client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "./footer";

const ACCESS_TOKEN = "access_token";
const CALENDARID = "calendarId";
const EVENTS = "events"; 

function ISODateString(d){
  function pad(n){return n<10 ? '0'+n : n}
  return d.getUTCFullYear()+'-'
       + pad(d.getUTCMonth()+1)+'-'
       + pad(d.getUTCDate())+'T'
       + pad(d.getUTCHours())+':'
       + pad(d.getUTCMinutes())+':'
       + pad(d.getUTCSeconds())+'Z'}

export default function LoadData() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [calendarList, setCalendarList] = useState([]);

  // Function that gets the events from google calendar with id calendarId
  const getCalendarData = async (calendarId) => {
    const accessToken = Cookies.get(ACCESS_TOKEN);

    // This syntax may be ugly, but it helps us initialize the time stamp as TODAY
    const timeMin = new Date();
    const timeMax = new Date();
    timeMin.setHours(11, 0, 0, 0);
    timeMax.setHours(20, 0, 0, 0);

    const fetchEvents = fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?access_token=${accessToken}`
        +`&timeMax=`+ISODateString(timeMax)
        +`&timeMin=`+ISODateString(timeMin)
    ).catch(error => {
      // if something goes awry, notify the user and reload the page to restart the process
      // this is probbaly bad practice, but this is as far as I'm willing to go right now
      alert(error);
      window.location.reload();
      }
    );

    fetchEvents.then(res => res.json()).then(calendarData => {

        // Add the events to Cookies
        Cookies.set(EVENTS, calendarData);
        navigate("/calendars", {state: {calendarData}});
    });

  }

  // Function that fetches the calendar list from gCal API and displays them as buttons
  const getCalendarList = async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN);

    const fetchDataRes = fetch(
      `https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token=${accessToken}`
    ).catch(error => {
        alert(error);
        window.location.reload();
      }
    );
    
    fetchDataRes.then(res => res.json()).then(calendarListData => {
        console.log("successfully received response from google api: "+calendarListData.items);
        
        while(calendarListData.items) {
          let newCal = calendarListData.items.pop();
          console.log("reading new calendar: "+JSON.stringify(newCal));
          if (!newCal) break;
    
          let newCalButton = (
            <li>
              <button onClick={() => {
                Cookies.set(CALENDARID, newCal.id);
                getCalendarData(newCal.id);
                }} className="calendarButton">
                  {newCal.summary}
              </button> 
            </li>
          );
          
          console.log("added new calendar button with id: "+newCal.id);
    
          setCalendarList(prevCalendarList => [...prevCalendarList, newCalButton]);
          console.log(`read new calendar ${newCal.summary} with id: ${newCal.id}`);
        }
    
        setIsLoading(!isLoading);
    });
  }

  // Ensures that before each request we have necessary credentials/data
  useEffect(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    const calendarId = Cookies.get(CALENDARID);
    if (!accessToken) {
      navigate("/");
    } else if (!calendarId){
      getCalendarList(accessToken);
    } else {
      getCalendarData(calendarId);
    }
  }, [navigate]);

  return (
    <>
      {isLoading ? <p>Loading...</p> : <div className="intro-containter">
          <ul>
            {calendarList}
          </ul>
          <Footer />
      </div>}
    </>
  );
}