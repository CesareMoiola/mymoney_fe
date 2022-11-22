import dayjs from "dayjs";

//Get today date
const today = () => {
    return formatDate(new Date());
}

//Format input date
const formatDate = (date) => {

    if(date !== null && date !== ""){
        return dayjs(date).format('YYYY-MM-DD')
    }

    return null;
}

const getDayBefore = (date) => {
    let currentDay = new Date(date);
    let dayBefore = new Date(currentDay.getTime());
    dayBefore.setDate(dayBefore.getDate() - 1);
    return formatDate(dayBefore);
}

export {today, formatDate, getDayBefore};