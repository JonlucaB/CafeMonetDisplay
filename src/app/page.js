import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import SignOnButtons from "./lib/calendarData";

export default function Home() {
  return (
  <body>
    <p>Google Calendar API Quickstart</p>

    {/* Add buttons to initiate auth sequence and sign out. Most of Google's quickstart is in here */}
    <SignOnButtons />

    <pre id="content" style={{whiteSpace : 'pre-wrap'}}></pre>
  </body>
  );
}
