"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleClick = () => {
    const callbackUrl = `${window.location.origin}`;
    const googleClientId = "902933263655-ri7j71ajih2ming6im024d3k23muscq3.apps.googleusercontent.com";
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile%20https://www.googleapis.com/auth/calendar.events.readonly`;
    console.log(callbackUrl);
    window.location.href = targetUrl;
  };

  const handleTestClick = () => {
    const calendarData = {
      "kind": "calendar#events",
      "etag": "\"p3289gk3d2n4ca0\"",
      "summary": "Your Calendar Name",
      "updated": "2024-08-30T12:00:00Z",
      "timeZone": "America/New_York",
      "accessRole": "owner",
      "defaultReminders": [],
      "items": [
        {
          "kind": "calendar#event",
          "etag": "\"p3245fghrwe214\"",
          "id": "event1_id",
          "status": "confirmed",
          "htmlLink": "https://www.google.com/calendar/event?eid=event1_id",
          "created": "2024-09-17T00:00:00Z",
          "updated": "2024-09-17T00:00:00Z",
          "summary": "Meeting at Table #3",
          "description": "Discussion with the team.",
          "location": "Table 1",
          "start": {
            "dateTime": "2024-09-17T14:00:00-04:00",
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": "2024-09-17T16:00:00-04:00",
            "timeZone": "America/New_York"
          },
          "recurrence": [],
          "reminders": {
            "useDefault": true
          }
        },
        {
          "kind": "calendar#event",
          "etag": "\"p3245fghrwe215\"",
          "id": "event2_id",
          "status": "confirmed",
          "htmlLink": "https://www.google.com/calendar/event?eid=event2_id",
          "created": "2024-08-30T01:00:00Z",
          "updated": "2024-08-30T01:00:00Z",
          "summary": "Lunch at Table #7",
          "description": "Lunch meeting with clients.",
          "location": "Table 2",
          "start": {
            "dateTime": "2024-09-17T12:00:00-04:00",
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": "2024-09-17T13:00:00-04:00",
            "timeZone": "America/New_York"
          },
          "recurrence": [],
          "reminders": {
            "useDefault": true
          }
        },
        {
          "kind": "calendar#event",
          "etag": "\"p3245fghrwe216\"",
          "id": "event3_id",
          "status": "confirmed",
          "htmlLink": "https://www.google.com/calendar/event?eid=event3_id",
          "created": "2024-08-30T02:00:00Z",
          "updated": "2024-08-30T02:00:00Z",
          "summary": "Project Review at Table #9",
          "description": "Reviewing the current project status.",
          "location": "Table 3",
          "start": {
            "dateTime": "2024-09-17T15:00:00-04:00",
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": "2024-09-17T16:00:00-04:00",
            "timeZone": "America/New_York"
          },
          "recurrence": [],
          "reminders": {
            "useDefault": true
          }
        },
        {
          "kind": "calendar#event",
          "etag": "\"p3245fghrwe216\"",
          "id": "event3_id",
          "status": "confirmed",
          "htmlLink": "https://www.google.com/calendar/event?eid=event3_id",
          "created": "2024-08-30T02:00:00Z",
          "updated": "2024-08-30T02:00:00Z",
          "summary": "Project Review at Table #9",
          "description": "Reviewing the current project status.",
          "location": "Table 8",
          "start": {
            "dateTime": "2024-09-17T15:00:00-04:00",
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": "2024-09-17T18:00:00-04:00",
            "timeZone": "America/New_York"
          },
          "recurrence": [],
          "reminders": {
            "useDefault": true
          }
        }
      ]
    };
    navigate("/calendars", { state: { calendarData }} );
  }

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/loading");
    }
  }, [isLoggedin, navigate]);

  return (
    <div className="root">
      <div>
        <div className="btn-container">
          <button className="btn btn-primary" onClick={handleTestClick}>

          </button>
        </div>
        <h1>Log in with Google</h1>
        <div className="btn-container">
          <button className="btn btn-primary" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 326667 333333"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              width={20}
              height={20}
            >
              <path
                d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                fill="#4285f4"
              />
              <path
                d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                fill="#34a853"
              />
              <path
                d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                fill="#fbbc04"
              />
              <path
                d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                fill="#ea4335"
              />
            </svg>
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}