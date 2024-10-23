"use=client";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from './timer';
import Footer from './footer';

const addMinutes = (date, minutes) => new Date(new Date(date).getTime() + (minutes * 60000));
const timeMarkers = [
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM", 
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM", 
    "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM", 
    "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM", 
    "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM", 
    "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM", 
    "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM", 
    "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", 
    "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", 
    "8:00 PM"
];

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

function GenerateTableDisplay(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tbody, setTbody] = useState([]);
    const tables = props.tables;
    const openTime = new Date();
    openTime.setHours(11, 0, 0, 0);

    // Create the headers part of the table
    let headers = [<th key="header-empty" />];
    timeMarkers.forEach(mark => {
        headers.push(
            <th key={`header-${mark}`}>
                {mark}
            </th>
        );
    });

    useEffect(() => {
        setIsLoading(true);
        let newRows = [];

        for (let i = 1; i < 10; i++) {
            let row;
            if (tables.has(i)) {
                // If there are reservations for the table
                row = props.rowGenerator(i, tables.get(i), openTime);
            } else {
                // If there are no reservations for the table
                console.log("There were no reservations for Table #" + i);
                row = props.rowGenerator(i, [], openTime);
            }

            const newRow = (
                <tr key={i}>
                    <td>Table #{i}</td>
                    {row.map((cell, index) => (
                        <td key={index} style={{ backgroundColor: cell.color }}>{cell.occupancy < tableOccupancies.get(i) && cell.occupancy > 0 ? cell.occupancy+'/'+tableOccupancies.get(i) : ''}</td>
                    ))}
                </tr>
            );
            newRows.push(newRow);
        }

        setTbody(newRows);
        setIsLoading(false);
    }, [props.tables]);

    return (
        <table className="styled-table">
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>
                {!isLoading ? tbody : <tr><td colSpan={headers.length}>Loading!</td></tr>}
            </tbody>
        </table>
    );
}

export default function Calendars() {
    const navigate = useNavigate();
    const location = useLocation();
    const events = location.state.calendarData;
    const [isLoading, setIsLoading] = useState(true);
    const [tables, setTables] = useState(new Map());

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

        return (() => window.history.replaceState({}, ''));
    }, navigate);

    return (
        <div>
            <div>
                {isLoading ? <p>Loading...</p> : <div className='overflow-div'>
                        <GenerateTableDisplay tables={tables} rowGenerator={generateRowColors} />
                    </div>}
            </div>
            <div>
                <h2>Legend:</h2>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <td >Color</td>
                            <td>Meaning</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style = {{backgroundColor: "green"}}/>
                            <td tyle = {{backgroundColor: "white"}}>Open</td>
                        </tr>
                        <tr>
                            <td style = {{backgroundColor: "orange"}}>2/6</td>
                            <td tyle = {{backgroundColor: "white"}}>Occupied by 2 people</td>
                        </tr>
                        <tr>
                            <td style = {{backgroundColor: "red"}}/>
                            <td tyle = {{backgroundColor: "white"}}>Full</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <p><b>***NOTE...</b> This page automatically refreshes every <u>10 minutes</u> to stay up-to-date with all reservations</p>
                <div>
                    <Timer duration={10} />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
