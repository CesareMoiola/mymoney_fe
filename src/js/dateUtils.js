import dayjs from "dayjs";
import properties from '../data/properties.json';

//Get today date
const today = () => {
    return formatInputDate(new Date());
}

//Format date for input purpose
const formatInputDate = (date) => {

    if(date !== null && date !== ""){
        return dayjs(date).format('YYYY-MM-DD')
    }

    return null;
}

//Format date for view
const formatDate = (date) => {

    if(date !== null && date !== ""){
        return dayjs(date).format(properties.dateFormat);
    }

    return null;
}


//Return day before input date
const getDayBefore = (date) => {
    let currentDay = new Date(date);
    let dayBefore = new Date(currentDay.getTime());
    dayBefore.setDate(dayBefore.getDate() - 1);
    return formatInputDate(dayBefore);
}

const getDateDifference = (date1, date2) => {
    let dateFormatted1 = new Date(date1);
    let dateFormatted2 = new Date(date2);
    const diffTime = dateFormatted2 - dateFormatted1;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

export {today, formatInputDate, formatDate, getDayBefore, getDateDifference};