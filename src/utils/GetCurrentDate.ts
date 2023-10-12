import { CalendarValueType } from 'primereact/calendar'


function getCurrentDate(): CalendarValueType {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
  
    const calendarValue: CalendarValueType = new Date(year, month, day);
  
    return calendarValue;
  }

  export default getCurrentDate;