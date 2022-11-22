import properties from '../data/properties.json';

const isAmountFormat = (value) => { 
    const regexp = /^-?\d+(\.\d{0,2})?$/;
    let amount = value;
    let isFormatCorrect = ( amount === "-" || amount === "" || regexp.test(amount) );

    return isFormatCorrect && amount.length <= properties.max_amount_length;
}

const isDateFormat = (value) => {
    return true;
}

export{ isAmountFormat, isDateFormat }