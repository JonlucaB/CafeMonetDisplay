"use=client";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function GenerateCalColumns(props) {
    // The logic for calculating the date is wrong but it does display a table with date headers! Woo hoo!
    const tables = props.tables;
    // The 540 number will change when we add in which date it is. This is how many minute between 11 - 20
    const timeBlock = parseInt(540/props.timeScale);
    const openTime = new Date(0, 0, 0, 11, 0);
    let tbody = [];
    let headers = [<th />];

    const addMinutes = (date, minutes) => new Date(date.getTime() + minutes*60000);

    for (let i = 0; i <= 540; i += 15) {
        let currentTime = addMinutes(openTime, i);
        
        headers.push(<th>{currentTime.toLocaleTimeString(navigator.language, {
            hour : '2-digit',
            minute : '2-digit'
        })}</th>)
    }

    for (let i = 1; i < 10; i++) {
        if (!tables.has(i)) {
            // navigate to error page
            console.log("Oh no! an error on Calendar line 28");
        }

        tbody.push(<calRow num={i} events={tables.get(i)} timeBlock={timeBlock} openTime={openTime} dtm={props.dtM}/>);
        console.log("added a calRow to tbody");
    }

    return (
        <table>
            <tr>
                {headers}
                {tbody.length != 9 ? <p>Loading!</p> : tbody}
            </tr>
        </table>
    )
}

export default function Calendars() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0.0);
    const [tables, setTables] = useState(new Map());
    const [timeScale, setTimeScale] = useState(15);
    
    // Get the current date time at midnight
    const currentDateTime = new Date(); 
    currentDateTime.setHours(0,0,0,0);
    const currentDateTimeMidnight = currentDateTime.getTime();

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
        
                tempTables.get(tableNumber).push([Date.parse(event.start.dateTime - currentDateTimeMidnight - (event.start.datetime%15000)), Date.parse(event.end.dateTime - currentDateTimeMidnight + (event.end.dateTime%15000))]);
                setProgress(progress => progress + progressByPop);
            }
            tableDisplay = [];
            setTables(tempTables);
            setIsLoading(!tempTables);
        } catch {
            // something that displays an error here, like an error page
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
                {isLoading ? <progress value={progress} maxValue={100}>{progress}%</progress> : <GenerateCalColumns timeScale={timeScale} tables={tables} dtM={currentDateTimeMidnight}/>}
            </div>
        </div>
    );
}