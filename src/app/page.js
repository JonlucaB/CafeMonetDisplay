import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import SignOnButtons, {gisLoaded, gapiLoaded} from "./lib/calendarData";

export default function Home() {
  return (
  <body>
    <p>Google Calendar API Quickstart</p>

    {/* Add buttons to initiate auth sequence and sign out */}
    <SignOnButtons />

    <pre id="content" style="white-space: pre-wrap;"></pre>

    <script async defer src="https://apis.google.com/js/api.js" onload={gapiLoaded}></script>
    <script async defer src="https://accounts.google.com/gsi/client" onload={gisLoaded}></script>
  </body>
  );
}
