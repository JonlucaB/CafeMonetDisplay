"use=client";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Calendars() {
    const location = useLocation();
    const [tables, setTables] = useState(new Map());
    const tableDisplays = [];

    useEffect(() => {
        console.log(location.state.calendarData);
        let data = location.state.calendarData.items;

        let tempTables = new Map();

        while (data.length) {
            const event = data.pop();
            console.log("new event popped: ", event);
    
            const tableMatch = event.location.match(/Table (\d+)/);
            if (!tableMatch) {
                console.error("No table number found in event summary:", event.summary);
                continue;
            }
    
            const tableNumber = parseInt(tableMatch[1], 10);
    
            // Update the table in the tables map with the event. idk what to do with it
            if (!tempTables.has(tableNumber)) {
                tempTables.set(tableNumber, []);
            }
    
            tempTables.get(tableNumber).push([Date.parse(event.start.dateTime), Date.parse(event.end.dateTime)]);
            console.log(tempTables.get(1));
        }

        setTables(tempTables);
    }, [location.state.calendarData]);

    return (
        <div>
            <p>Hello Events!</p>
            <div>
                {/* this isn't going to get re-rendered because the memory location isn't changing... another blocker! */}
                {tables.forEach( (tableNum, eventList) => <calColumn events={eventList} num={tableNum}/>)}
            </div>
        </div>
    );
}