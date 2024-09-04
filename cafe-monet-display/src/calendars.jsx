"use=client";
import Cookies from 'js-cookie';

export default function Calendars() {

    return (
        <div>
            <p>Hello Events!</p>
            <p>{Cookies.get("events")}</p>
        </div>
    );
}