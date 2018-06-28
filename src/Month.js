"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Month;
(function (Month) {
    Month["January"] = "January";
    Month["February"] = "February";
    Month["March"] = "March";
    Month["April"] = "April";
    Month["May"] = "May";
    Month["June"] = "June";
    Month["July"] = "July";
    Month["August"] = "August";
    Month["September"] = "September";
    Month["October"] = "October";
    Month["November"] = "November";
    Month["December"] = "December";
})(Month || (Month = {}));
exports.Month = Month;
/**
 * Convert the JavaScript Month ID into a `Month` enum
 *
 * @param {number} id
 * @returns {Month}
 */
var monthFromId = function (id) {
    switch (id) {
        case 0:
            return Month.January;
        case 1:
            return Month.February;
        case 2:
            return Month.March;
        case 3:
            return Month.April;
        case 4:
            return Month.May;
        case 5:
            return Month.June;
        case 6:
            return Month.July;
        case 7:
            return Month.August;
        case 8:
            return Month.September;
        case 9:
            return Month.October;
        case 10:
            return Month.November;
        case 11:
            return Month.December;
        default:
            throw new RangeError("Given ID \"" + id + "\" is out of range");
    }
};
exports.monthFromId = monthFromId;
/**
 * Convert the `Month` enum into the JavaScript Month ID
 *
 * @param {Month} month
 * @returns {number}
 */
var idFromMonth = function (month) {
    switch (month) {
        case Month.January:
            return 0;
        case Month.February:
            return 1;
        case Month.March:
            return 2;
        case Month.April:
            return 3;
        case Month.May:
            return 4;
        case Month.June:
            return 5;
        case Month.July:
            return 6;
        case Month.August:
            return 7;
        case Month.September:
            return 8;
        case Month.October:
            return 9;
        case Month.November:
            return 10;
        case Month.December:
            return 11;
        default:
            throw new RangeError("A invalid Month instance \"" + month + "\" has been created. This must never happen");
    }
};
exports.idFromMonth = idFromMonth;
/**
 * Determine the number of days for the given month and year
 * Month is 1-indexed (January is 1, February is 2, etc).
 *
 * @param {Month} month
 * @param {number} year
 */
var daysInMonth = function (month, year) {
    var monthId = idFromMonth(month);
    return new Date(year, monthId + 1, 0).getDate();
};
exports.daysInMonth = daysInMonth;
