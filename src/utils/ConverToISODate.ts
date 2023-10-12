import { CalendarValueType } from 'primereact/calendar'

function ConverToISODate(data:  string) {
    
    const originalDate = new Date(data);

    const isoString = originalDate.toISOString();

    return isoString.slice(0, 10);
}

export default ConverToISODate;