
const months =
{
    1:  "January",
    2:  "Febuary",
    3:  "March",
    4:  "April",
    5:  "May",
    6:  "June",
    7:  "July",
    8:  "August",
    9:  "September",
    10: "October",
    11: "November",
    12: "December"
}

function convertMilitary(hours, minutes)
{
    const morning = hours < 12;

    if(hours === 0)
    {
        hours = 12;
    }
    else if(hours > 12)
    {
        hours -= 12;
    }

    if(minutes < 10)
    {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes} ${morning ? 'AM' : 'PM'}`;
}

function formatToString(date)
{
    let string = "";

    string += months[date.getMonth()] + " ";
    string += date.getDate() + ", ";
    string += date.getFullYear() + " - ";
    string += convertMilitary(date.getHours(), date.getMinutes());

    return string;
}

module.exports.formatToString = formatToString;