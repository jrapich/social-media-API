//dayjs for formatting dates
const dayjs = require('dayjs');

//function to format dates we will use in a getter in various models
const formatDate = function (date){
    return dayjs(date).format('MM/DD/YYYY:hh:mm:ss:A');
}

module.exports = {formatDate};