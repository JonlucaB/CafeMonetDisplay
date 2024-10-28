import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CalendarsDisplay from "../display/calendarsDisplay";

const addMinutes = (date, minutes) => new Date(new Date(date).getTime() + (minutes * 60000));

const tableOccupancies = new Map([
    [1, 2],
    [2, 6],
    [3, 4],
    [4, 4],
    [5, 4],
    [6, 6],
    [7, 6],
    [8, 4],
    [9, 6]
]);

export default function Calendars() {
    const navigate = useNavigate();
    const location = useLocation();
    const events = location.state.calendarData;
    const [tables, setTables] = useState(new Map());
    const [isLoading, setIsLoading] = useState(false);

    function generateRowColors(tableNum, events, openTime) {
        let slotAvailability = new Map();

        for (let m = 0; m <= 540; m += 15) {
            let currentTime = addMinutes(openTime, m);
            slotAvailability.set(currentTime.getTime(), {occupancy:0, color:"green"});
        }

        if (events) {
            const reservations = events.sort((a, b) => a.start - b.start);
            reservations.forEach((res) => {
                // Scrub the start and end times so that they align on our 15 minute marks
                const start = new Date((res.start - (res.start % 900000)));
                const end = new Date(res.end + (res.end % 900000));

                // from the beginning to end of each calendar event, set the respective marks to RED
                for (let t = start; t <= end; t = addMinutes(t, 15)) {
                    console.log("Time "+t.toLocaleTimeString(navigator.language, {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })+" set to red");
                    
                    let currentSlot = slotAvailability.get(t.getTime());

                    // for some reason all the events we are getting in are 1 hr ahead of their display time in gcal... some time zone issue
                    // we  need to fix that or else this error will show up for everything after 7pm on the cal...
                    if(!currentSlot) {
                        alert("There was an error reading the times from the data, please refresh the page or berate the developer...");
                    } else {
                        const newOccupancy = currentSlot.occupancy + res.people;
                        const newColor = newOccupancy >= tableOccupancies.get(tableNum) ? "red" : "orange";
                        slotAvailability.set(t.getTime(), {occupancy:newOccupancy, color:newColor});
                    }

                }
            });
        }

        return [...slotAvailability.values()];
    }

    useEffect(() => {
        setIsLoading(true);
        if (!events.items) {
            navigate('/login');
        }

        // deconstruct our google api response
        console.log(events.items);
        const data = events.items;
        console.log(data);
        let tempTables = new Map();

        while (data.length) {
            const event = data.pop();
            let tableMatch = null;
            console.log("reading new event: "+event);

            if (event.location) {
                tableMatch = event.location.match(/Table #?(\d+)/);
                if (!tableMatch) {
                    console.error("No table number found in event summary:", event.summary);
                    continue;
                }
            } else {
                console.log("Event "+event.summary+" did not have a location, removing it from display.");
                continue;
            }

            // read the table number
            const tableNumber = parseInt(tableMatch[1], 10);

            // read the number of people (could be in location or summary)
            const getNumPeople = (match) => match ? parseInt(match[0], 10) : 0;
            const locPeopleMatch = event.location.match(/(\d+)\s*(?:ppl|people|person)/gi);
            const sumPeopleMatch = event.summary.match(/(\d+)\s*(?:ppl|people|person)/gi);
            const numPeople = Math.max(getNumPeople(locPeopleMatch), getNumPeople(sumPeopleMatch));

            if (!tempTables.has(tableNumber)) {
                tempTables.set(tableNumber, []);
            }

            tempTables.get(tableNumber).push({
                "start":new Date(event.start.dateTime).getTime(),
                "end":new Date(event.end.dateTime).getTime(),
                "people":(numPeople === 0 ? tableOccupancies.get(tableNumber) : numPeople)
            });
        }

        setTables(tempTables);
        setIsLoading(false);

        return (() => {
            window.history.replaceState({}, '');
            setTables(null);
        });
    }, [navigate]);

    return (
        <CalendarsDisplay tables={tables} rowGenerator={generateRowColors} loading={isLoading}/>
    );
}