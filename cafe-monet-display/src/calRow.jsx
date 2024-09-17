export default function calRow(props) {

    // Events is basically an array full of date arrays of [start, end] and sorted by start date
    const reservations = props.events.sort((time1, time2) => time1[0] - time2[0]);
    let slotAvailability = new Map();
    const tableNum = props.num;

    // timeBlock is also the number of cells that will be present in the table
    const timeBlock = props.timeBlock;
    const openTime = props.openTime;

    let columns = [<td>Table #{tableNum}</td>];

    for (let m = openTime.getTime() - props.dtM; m < 1200000; m += 15000) {
        slotAvailability.set(m, "green");
        console.log("Set time "+m+" to green");
    }

    reservations.forEach((res) => {
        if (slotAvailability.has(res[0])) {
            for (let t = res[0]; t <= res[1]; t += 15000) {
                slotAvailability.set(t, "red");
                console.log("Set time "+t+" to red");
            }
        } else {
            console.log("something went wrong with table #"+tableNum);
        }
    });

    // slotAvailability.forEach((_, color) => columns.push(<td bgColor={color}/>));
    console.log("columns -> "+columns);
    console.log("slotAvailability -> "+slotAvailability);
    // props => { "calendarEvents" : an Array of arrays that represent reservations with the same table number }
    // So the format is this => [[{startDateTime, endDateTime}]] for a given table number t
    // we will give this functional component the array and that's it, as it does not need to know which table it is
    // It will need to make an entire column, or table if that's easier, using the array in the props given to it to
    // make a column cell display of reserved times. We can do it by every 15 minutes...? There should be a way I can
    // make that dynamic and have it render depending on user input

    return slotAvailability;
}