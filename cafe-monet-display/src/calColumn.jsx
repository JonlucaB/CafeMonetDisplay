import { useState } from "react";

export default function calColumn(props) {
    const [timeScale, setTimeScale] = useState(25);

    const reservations = props.events;
    const tableNum = props.num;
    // props => { "calendarEvents" : an Array of arrays that represent reservations with the same table number }
    // So the format is this => [[{startDateTime, endDateTime}]] for a given table number t
    // we will give this functional component the array and that's it, as it does not need to know which table it is
    // It will need to make an entire column, or table if that's easier, using the array in the props given to it to
    // make a column cell display of reserved times. We can do it by every 15 minutes...? There should be a way I can
    // make that dynamic and have it render depending on user input

    return (
        <div>
            <p>Hellow I am a column for table {tableNum}!</p>
            <p>I currently have {reservations.length} listings!</p>
        </div>
    );
}