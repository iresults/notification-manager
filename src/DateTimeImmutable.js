"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Month_1 = require("./Month");
/**
 * Immutable Date object inspired by PHP's DateTimeImmutable
 */
var DateTimeImmutable = /** @class */ (function () {
    function DateTimeImmutable(input, format) {
        if (arguments.length === 0) {
            this._moment = moment();
        }
        else if (input instanceof DateTimeImmutable) {
            this._moment = input._moment.clone();
        }
        else if (input instanceof Date) {
            this._moment = moment(input);
        }
        else if (moment.isMoment(input)) {
            this._moment = input.clone();
        }
        else if (typeof input === 'string') {
            if (typeof format !== 'string') {
                format = 'YYYY-MM-DD HH:mm:ssZ';
            }
            this._moment = moment(input, format);
        }
        else {
            throw new TypeError('Invalid input type ' + (typeof input));
        }
        if (!this._moment.isValid()) {
            throw new RangeError('Could not create a valid date');
        }
    }
    Object.defineProperty(DateTimeImmutable.prototype, "dateInstance", {
        get: function () {
            return this._moment.toDate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeImmutable.prototype, "date", {
        /**
         * Get the day of Month
         *
         * @returns {number}
         */
        get: function () {
            return this._moment.date();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeImmutable.prototype, "month", {
        /**
         * Get the Month
         *
         * @returns {Month}
         */
        get: function () {
            return Month_1.monthFromId(this._moment.month());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeImmutable.prototype, "monthId", {
        /**
         * Get the JavaScript Month index
         *
         * @returns {number}
         */
        get: function () {
            return this._moment.month();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeImmutable.prototype, "year", {
        /**
         * Get the Year
         *
         * @returns {number}
         */
        get: function () {
            return this._moment.year();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeImmutable.prototype, "timestamp", {
        /**
         * Get the UNIX timestamp in milliseconds since 1970-01-01
         *
         * @returns {number}
         */
        get: function () {
            return this._moment.valueOf();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeImmutable.prototype, "isoWeekday", {
        /**
         * Get the ISO day of the week with 1 being Monday and 7 being Sunday
         *
         * @returns {number}
         */
        get: function () {
            return this._moment.isoWeekday();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return the UNIX timestamp in milliseconds since 1970-01-01
     *
     * @returns {number}
     */
    DateTimeImmutable.prototype.valueOf = function () {
        return this._moment.valueOf();
    };
    /**
     * Render the date in the given format
     *
     * @link https://momentjs.com/docs/#/displaying/
     *
     * @param {string} format
     * @return string
     */
    DateTimeImmutable.prototype.format = function (format) {
        return this._moment.format(format);
    };
    /**
     * Add the given time to the clone
     *
     * @see https://momentjs.com/docs/#/manipulating/add/
     * @param {ModifyInputArgument1} amount
     * @param {ModifyInputArgument2} unit
     * @returns {DateTimeImmutable}
     */
    DateTimeImmutable.prototype.add = function (amount, unit) {
        var clone = this._moment.clone();
        clone.add(amount, unit);
        return new DateTimeImmutable(clone);
    };
    /**
     * Subtract the given time from the clone
     *
     * @see https://momentjs.com/docs/#/manipulating/subtract/
     * @param {ModifyInputArgument1} amount
     * @param {ModifyInputArgument2} unit
     * @returns {DateTimeImmutable}
     */
    DateTimeImmutable.prototype.subtract = function (amount, unit) {
        var clone = this._moment.clone();
        clone.subtract(amount, unit);
        return new DateTimeImmutable(clone);
    };
    /**
     * Return the difference between `this` and `otherDate` in milliseconds or the specified `unitOfTime`
     * @param {DateTimeImmutable | Moment} otherDate
     * @param {Diff} unitOfTime
     * @returns {number}
     */
    DateTimeImmutable.prototype.diff = function (otherDate, unitOfTime) {
        if (otherDate instanceof DateTimeImmutable) {
            return this.diff(otherDate._moment, unitOfTime);
        }
        return this._moment.diff(otherDate, unitOfTime);
    };
    /**
     * Check if a date is between two other dates
     *
     * @see https://momentjs.com/docs/#/query/is-between/
     * @param {DateTimeImmutable} from
     * @param {DateTimeImmutable} to
     * @param {StartOf} granularity
     * @param {"()" | "[)" | "(]" | "[]"} inclusivity
     * @returns {boolean}
     */
    DateTimeImmutable.prototype.isBetween = function (from, to, granularity, inclusivity) {
        if (!(from instanceof DateTimeImmutable)) {
            throw new TypeError('Argument "from" must be an instance of DateTimeImmutable');
        }
        if (!(to instanceof DateTimeImmutable)) {
            throw new TypeError('Argument "from" must be an instance of DateTimeImmutable');
        }
        return this._moment.isBetween(from._moment, to._moment, granularity, inclusivity);
    };
    /**
     * Check if a date is before another date
     *
     * @see https://momentjs.com/docs/#/query/is-before/
     * @param {DateTimeImmutable | Moment} otherDate
     * @param {StartOf} units
     * @return {boolean}
     */
    DateTimeImmutable.prototype.isBefore = function (otherDate, units) {
        if (otherDate instanceof DateTimeImmutable) {
            return this._moment.isBefore(otherDate._moment, units);
        }
        return this._moment.isBefore(otherDate, units);
    };
    /**
     * Check if a date is after another date
     *
     * @see https://momentjs.com/docs/#/query/is-before/
     * @param {DateTimeImmutable | Moment} otherDate
     * @param {StartOf} units
     * @return {boolean}
     */
    DateTimeImmutable.prototype.isAfter = function (otherDate, units) {
        if (otherDate instanceof DateTimeImmutable) {
            return this._moment.isAfter(otherDate._moment, units);
        }
        return this._moment.isAfter(otherDate, units);
    };
    /**
     * Return a clone with the given time
     *
     * A `RangeError` will be thrown if one of the arguments would overflow into the next unit.
     *
     * To allow overflows use `setTimeWithOverflow()`
     *
     * @param {number} hour
     * @param {number} minute
     * @param {number} second
     * @param {number} millisecond
     * @returns {DateTimeImmutable}
     */
    DateTimeImmutable.prototype.setTime = function (hour, minute, second, millisecond) {
        if (hour > 23) {
            throw new RangeError('Argument "hour" must not be bigger than 23');
        }
        if (minute !== undefined && minute > 59) {
            throw new RangeError('Argument "minute" must not be bigger than 59');
        }
        if (second !== undefined && second > 59) {
            throw new RangeError('Argument "second" must not be bigger than 59');
        }
        if (millisecond !== undefined && millisecond > 999) {
            throw new RangeError('Argument "millisecond" must not be bigger than 999');
        }
        return this.setTimeWithOverflow(hour, minute, second, millisecond);
    };
    /**
     * Return a clone with the given time with overflow
     *
     * If `minute` is 74 it will overflow to 1 hour and 14 minutes
     *
     * @param {number} hour
     * @param {number} minute
     * @param {number} second
     * @param {number} millisecond
     * @returns {DateTimeImmutable}
     */
    DateTimeImmutable.prototype.setTimeWithOverflow = function (hour, minute, second, millisecond) {
        var clone = this._moment.clone();
        clone.hour(hour);
        if (undefined !== minute) {
            clone.minute(minute);
        }
        if (undefined !== second) {
            clone.second(second);
        }
        if (undefined !== millisecond) {
            clone.millisecond(millisecond);
        }
        return new DateTimeImmutable(clone);
    };
    /**
     * Return a clone with the given date
     *
     * A `RangeError` will be thrown if `day` is bigger than the maximum number of days in the target month, or if `day`
     * is lower than 1.
     *
     * To allow overflows use `setDateWithOverflow()`
     *
     * @param {number} year
     * @param {Month} month
     * @param {number} day
     * @returns {DateTimeImmutable}
     */
    DateTimeImmutable.prototype.setDate = function (year, month, day) {
        if (day > this.determineDaysInMonth(month, year)) {
            throw new RangeError("Day \"" + day + "\" would overflow into the next month");
        }
        if (day < 1) {
            throw new RangeError("Day must be bigger than zero");
        }
        return this.setDateWithOverflow(year, Month_1.idFromMonth(month), day);
    };
    /**
     * Return a clone with the given date with overflow
     *
     * If `monthId` is bigger than 11 the date will overflow to the following year(s).
     * If `day` is bigger than the month's number of days the date will overflow to the following month(s).
     *
     * @param {number} year
     * @param {number} monthId
     * @param {number} day
     * @returns {DateTimeImmutable}
     */
    DateTimeImmutable.prototype.setDateWithOverflow = function (year, monthId, day) {
        var clone = this._moment.clone();
        clone.year(year);
        clone.month(monthId);
        clone.date(day);
        return new DateTimeImmutable(clone);
    };
    /**
     * Month is 1-indexed (January is 1, February is 2, etc).
     *
     * @param {Month} month
     * @param {number} year
     */
    DateTimeImmutable.prototype.determineDaysInMonth = function (month, year) {
        var monthId = Month_1.idFromMonth(month);
        return new Date(year, monthId + 1, 0).getDate();
    };
    return DateTimeImmutable;
}());
exports.DateTimeImmutable = DateTimeImmutable;
