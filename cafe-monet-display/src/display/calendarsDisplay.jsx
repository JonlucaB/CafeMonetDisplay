import React, {useState, useEffect} from 'react';
import Timer from '../components/timer';
import Footer from './footer';

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

function CalendarsDisplay({tables, rowGenerator}) {
    const [isLoading, setIsLoading] = useState(true);
    const [tbody, setTbody] = useState([]);
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
                row = rowGenerator(i, tables.get(i), openTime);
            } else {
                // If there are no reservations for the table
                console.log("There were no reservations for Table #" + i);
                row = rowGenerator(i, [], openTime);
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
    }, [tables]);

    return (
        <div>
            <div>
                {isLoading ? <p>Loading...</p> : <div className='overflow-div'>
                    <table className="styled-table">
                        <thead>
                            <tr>{headers}</tr>
                        </thead>
                        <tbody>
                            {!isLoading ? tbody : <tr><td colSpan={headers.length}>Loading!</td></tr>}
                        </tbody>
                    </table>
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
};

export default CalendarsDisplay;