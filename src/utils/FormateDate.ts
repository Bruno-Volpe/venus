import { CalendarValueType } from 'primereact/calendar'
import moment from 'moment';

function formateDate(data: string):CalendarValueType {
    const date = new Date(data);
    
    return moment(date).toDate();
}

export default formateDate;