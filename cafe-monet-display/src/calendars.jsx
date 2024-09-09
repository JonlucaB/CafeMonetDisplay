"use=client";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function GenerateCalColumns(props) {
    // The logic for calculating the date is wrong but it does display a table with date headers! Woo hoo!
    const tables = props.tables;
    const timeBlock = parseInt(5400/props.timeScale);
    const openTime = new Date(0, 0, 0, 11, 0);
    let tbody = [];
    let headers = [];

    const addMinutes = (date, minutes) => new Date(date.getTime() + minutes*60000);

    for (let i = 0; i <= 5400; i += timeBlock) {
        let currentTime = addMinutes(openTime, i);
        
        headers.push(<th>{currentTime.toLocaleTimeString(navigator.language, {
            hour : '2-digit',
            minute : '2-digit'
        })}</th>)
    }

    // for (let i = 1; i < 10; i++) {

    // }

    return (
        <table>
            <tr>
                {headers}
            </tr>
        </table>
    )
}

export default function Calendars() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0.0);
    const [tables, setTables] = useState(new Map());
    const [timeScale, setTimeScale] = useState(25);
    let tableDisplay;

    useEffect(() => {
        setIsLoading(true);
        console.log(location.state.calendarData);
        let data = location.state.calendarData.items;
        const progressByPop = 100.0/data.length;
        let tempTables = new Map();

        try {
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
                setProgress(progress => progress + progressByPop);
            }
            tableDisplay = [];
            setTables(tempTables);
            setIsLoading(!tempTables);
        } catch {
            // something that displays an error here
        }
    }, [location.state.calendarData]);

    if (tables.length) {
        for (let i = 1; i < 10; i++) {
            tableDisplay.push(<calColumn num={i} events={tables.get(i)} />);
            console.log("added event to display");
        }
    }

    return (
        <div>
            <p>Hello Events!</p>
            <div>
                {isLoading ? <progress value={progress} maxValue={100}>{progress}%</progress> : <GenerateCalColumns timeScale={timeScale} tables={tables} />}
            </div>
        </div>
    );
}