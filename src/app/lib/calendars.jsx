import Cookies from 'js-cookie';

export default function Calendars() {
    
    useEffect(() => {
        const calendarIDList = Cookies.get("calendars").items;
        console.log(calendarIDList);
    }, []);

    return (
        <div>

        </div>
    );
}