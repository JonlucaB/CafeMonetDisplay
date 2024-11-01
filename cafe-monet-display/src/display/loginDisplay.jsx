import React from 'react';
import Footer from './footer';

export default function loginDisplay({onPrimaryClick, onTestClick}) {

    return (
        <div className="root">
      <div className="intro-container">
        <h1>Welcome to the Cafe Monet Reservation Display App!</h1>
        <p>If you are using this app for the first time, all you have to do is login with Google using the button below, and allow this app to request information about all the calendars associated with your account.</p>
        <p>This app does not send your calendar data to any third parties, nor does it host any ad services whatsoever. It simply serves as a script that helps in displaying reservations made to Cafe Monet, located in Austin, TX and Bastrop, TX.</p>
        <p>After you log in, you will be prompted with a list of buttons with calendar names on it. Please click the button that corresponds to the calendar that holds the table reservations, as that will be displayed in the page that follows it.</p>
        <p>If you have any questions, feel free to reach out to the developer of this app: <a href= "mailto: jonlucabiagini@gmail.com"> jonlucabiagini@gmail.com</a>.</p>
        <h2>Log in with Google</h2>
        <div className="btn-container">
          <button className="btn btn-primary" onClick={onPrimaryClick}>
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
          <p />
          <button className="btn btn-primary" onClick={onTestClick}>
            See a demo
          </button>
        </div>
        <Footer />
      </div>
    </div>
    )
}