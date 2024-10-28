import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginDisplay from '../display/loginDisplay';
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  // Function that takes the user to the Google auth screen
  const handleClick = () => {
    const callbackUrl = `${window.location.origin}`;
    const googleClientId = "902933263655-ri7j71ajih2ming6im024d3k23muscq3.apps.googleusercontent.com";
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile%20https://www.googleapis.com/auth/calendar.events.readonly%20https://www.googleapis.com/auth/calendar.readonly`;
    console.log(callbackUrl);
    window.location.href = targetUrl;
  };

  // Function for setting the calendar data to test data - local testing purposes
  const handleTestClick = () => {
    function pad(n){return n<10 ? '0'+n : n}
    const currentUTCYear = new Date().getUTCFullYear();
    const currentUTCMonth = new Date().getUTCMonth() + 1;
    const currentUTCDay = new Date().getUTCDate();
    
    const buildCurrentDate = (timeStamp) => currentUTCYear+'-'+pad(currentUTCMonth)+'-'+pad(currentUTCDay)+'T'+timeStamp;

    const calendarData = {
      "items": [
        {
          "summary": "2 ppl Meeting at Table #3",
          "location": "Table 1",
          "start": {
            "dateTime": buildCurrentDate("12:00:00-05:00"),
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": buildCurrentDate("16:00:00-05:00"),
            "timeZone": "America/New_York"
          }
        },
        {
          "summary": "Lunch at Table #7 - 3 people",
          "location": "Table 2",
          "start": {
            "dateTime": buildCurrentDate("12:00:00-054:00"),
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": buildCurrentDate("13:00:00-05:00"),
            "timeZone": "America/New_York"
          }        
        },
        {
          "summary": "Lunch at Table #7 - 3 people",
          "location": "Table 2",
          "start": {
            "dateTime": buildCurrentDate("12:30:00-05:00"),
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": buildCurrentDate("13:00:00-05:00"),
            "timeZone": "America/New_York"
          }
        },
        {
          "summary": "Project Review at Table #9",
          "location": "Table 3",
          "start": {
            "dateTime": buildCurrentDate("15:00:00-05:00"),
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": buildCurrentDate("16:00:00-05:00"),
            "timeZone": "America/New_York"
          }
        },
        {
          "summary": "Project Review at Table #9 1 people",
          "location": "Table 8",
          "start": {
            "dateTime": buildCurrentDate("15:00:00-05:00"),
            "timeZone": "America/New_York"
          },
          "end": {
            "dateTime": buildCurrentDate("18:00:00-05:00"),
            "timeZone": "America/New_York"
          }
        }
      ]
    };

    console.log("using dummy data:\n"+JSON.stringify(calendarData.items));
    navigate("/calendars", {state: {calendarData}} );
  }

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      Cookies.remove("calendarId")
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/loadData");
    }
  }, [isLoggedin, navigate]);

  return (
    <LoginDisplay onPrimaryClick={handleClick} onTestClick={handleTestClick} />
  );
}