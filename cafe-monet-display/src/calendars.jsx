"use=client";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const addMinutes = (date, minutes) => new Date(new Date(date).getTime() + (minutes * 60000));

function GenerateCalColumns(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [tbody, setTbody] = useState([]);
    const tables = props.tables;
    const openTime = new Date(); // 11:00 AM
    openTime.setHours(11, 0, 0, 0); // we set the time to 11:00 AM
    let headers = [<th key="header-empty" />];

    for (let i = 0; i <= 540; i += 15) {
        let currentTime = addMinutes(openTime, i);
        headers.push(
            <th key={`header-${i}`}>
                {currentTime.toLocaleTimeString(navigator.language, {
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </th>
        );
    }

    useEffect(() => {
        setIsLoading(true);
        let newRows = [];

        for (let i = 1; i < 10; i++) {
            let colors;
            if (tables.has(i)) {
                // If there are reservations for the table
                colors = props.rowGenerator(tables.get(i), openTime);
            } else {
                // If there are no reservations for the table
                console.log("There were no reservations for Table #" + i);
                colors = props.rowGenerator([], openTime);
            }

            const newRow = (
                <tr key={i}>
                    <td>Table #{i}</td>
                    {colors.map((color, index) => (
                        <td key={index} style={{ backgroundColor: color }}></td>
                    ))}
                </tr>
            );
            newRows.push(newRow);
        }

        setTbody(newRows);
        setIsLoading(false);
    }, [props.tables]);

    return (
        <table>
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
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [tables, setTables] = useState(new Map());

    function generateRowColors(events, openTime) {
        let slotAvailability = new Map();

        for (let m = 0; m < 540; m += 15) {
            let currentTime = addMinutes(openTime, m);
            slotAvailability.set(currentTime.getTime(), "green");
        }

        if (events) {
            const reservations = events.sort((a, b) => a[0] - b[0]);
            reservations.forEach((res) => {
                const start = new Date((res[0] - (res[0] % 900000)) + 3600000);
                const end = new Date(res[1] + (res[1] % 900000) + 3600000);
                for (let t = start; t <= end; t = addMinutes(t, 15)) {
                    console.log("Time "+t.toLocaleTimeString(navigator.language, {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })+" set to red");
                    slotAvailability.set(t.getTime(), "red");
                }
            });
        }

        return [...slotAvailability.values()];
    }

    useEffect(() => {
        setIsLoading(true);
        let data = location.state.calendarData.items;
        const progressByPop = 100.0 / data.length;
        let tempTables = new Map();

        try {
            while (data.length) {
                const event = data.pop();
                const tableMatch = event.location.match(/Table (\d+)/);
                if (!tableMatch) {
                    console.error("No table number found in event summary:", event.summary);
                    continue;
                }

                const tableNumber = parseInt(tableMatch[1], 10);

                if (!tempTables.has(tableNumber)) {
                    tempTables.set(tableNumber, []);
                }

                tempTables.get(tableNumber).push([
                    new Date(event.start.dateTime).getTime(),
                    new Date(event.end.dateTime).getTime()
                ]);
            }

            setTables(tempTables);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading events:", error);
        }
    }, [location.state.calendarData]);

    return (
        <div>
            {isLoading ? <p>Loading...</p> : <GenerateCalColumns tables={tables} rowGenerator={generateRowColors} />}
        </div>
    );
}
