/* flatpickr v4.5.2, @license MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.minMaxTimePlugin = factory());
}(this, (function () { 'use strict';

    const pad = (number) => `0${number}`.slice(-2);
    const int = (bool) => (bool === true ? 1 : 0);

    const monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
    const formats = {
        Z: (date) => date.toISOString(),
        D: function (date, locale, options) {
            return locale.weekdays.shorthand[formats.w(date, locale, options)];
        },
        F: function (date, locale, options) {
            return monthToStr(formats.n(date, locale, options) - 1, false, locale);
        },
        G: function (date, locale, options) {
            return pad(formats.h(date, locale, options));
        },
        H: (date) => pad(date.getHours()),
        J: function (date, locale) {
            return locale.ordinal !== undefined
                ? date.getDate() + locale.ordinal(date.getDate())
                : date.getDate();
        },
        K: (date, locale) => locale.amPM[int(date.getHours() > 11)],
        M: function (date, locale) {
            return monthToStr(date.getMonth(), true, locale);
        },
        S: (date) => pad(date.getSeconds()),
        U: (date) => date.getTime() / 1000,
        W: function (date, _, options) {
            return options.getWeek(date);
        },
        Y: (date) => date.getFullYear(),
        d: (date) => pad(date.getDate()),
        h: (date) => (date.getHours() % 12 ? date.getHours() % 12 : 12),
        i: (date) => pad(date.getMinutes()),
        j: (date) => date.getDate(),
        l: function (date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        m: (date) => pad(date.getMonth() + 1),
        n: (date) => date.getMonth() + 1,
        s: (date) => date.getSeconds(),
        w: (date) => date.getDay(),
        y: (date) => String(date.getFullYear()).substring(2),
    };

    const defaults = {
        _disable: [],
        _enable: [],
        allowInput: false,
        altFormat: "F j, Y",
        altInput: false,
        altInputClass: "form-control input",
        animate: typeof window === "object" &&
            window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        clickOpens: true,
        closeOnSelect: true,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: false,
        enable: [],
        enableSeconds: false,
        enableTime: false,
        errorHandler: (err) => typeof console !== "undefined" && console.warn(err),
        getWeek,
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: false,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: false,
        now: new Date(),
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: undefined,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: false,
        showMonths: 1,
        static: false,
        time_24hr: false,
        weekNumbers: false,
        wrap: false,
    };

    const english = {
        weekdays: {
            shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            longhand: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
        },
        months: {
            shorthand: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            longhand: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 0,
        ordinal: (nth) => {
            const s = nth % 100;
            if (s > 3 && s < 21)
                return "th";
            switch (s % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: ["AM", "PM"],
        yearAriaLabel: "Year",
    };

    const createDateFormatter = ({ config = defaults, l10n = english, }) => (dateObj, frmt, overrideLocale) => {
        const locale = overrideLocale || l10n;
        if (config.formatDate !== undefined) {
            return config.formatDate(dateObj, frmt, locale);
        }
        return frmt
            .split("")
            .map((c, i, arr) => formats[c] && arr[i - 1] !== "\\"
            ? formats[c](dateObj, locale, config)
            : c !== "\\"
                ? c
                : "")
            .join("");
    };
    function compareDates(date1, date2, timeless = true) {
        if (timeless !== false) {
            return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                new Date(date2.getTime()).setHours(0, 0, 0, 0));
        }
        return date1.getTime() - date2.getTime();
    }
    function compareTimes(date1, date2) {
        return (3600 * (date1.getHours() - date2.getHours()) +
            60 * (date1.getMinutes() - date2.getMinutes()) +
            date1.getSeconds() -
            date2.getSeconds());
    }
    const getWeek = (givenDate) => {
        const date = new Date(givenDate.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        var week1 = new Date(date.getFullYear(), 0, 4);
        return (1 +
            Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7));
    };

    function minMaxTimePlugin(config = {}) {
        const state = {
            formatDate: createDateFormatter({}),
            tableDateFormat: config.tableDateFormat || "Y-m-d",
            defaults: {
                minTime: undefined,
                maxTime: undefined,
            },
        };
        function findDateTimeLimit(date) {
            if (config.table !== undefined) {
                return config.table[state.formatDate(date, state.tableDateFormat)];
            }
            return config.getTimeLimits && config.getTimeLimits(date);
        }
        return function (fp) {
            return {
                onReady() {
                    state.formatDate = this.formatDate;
                    state.defaults = {
                        minTime: this.config.minTime && state.formatDate(this.config.minTime, "H:i"),
                        maxTime: this.config.maxTime && state.formatDate(this.config.maxTime, "H:i"),
                    };
                },
                onChange() {
                    const latest = this.latestSelectedDateObj;
                    const matchingTimeLimit = latest && findDateTimeLimit(latest);
                    if (latest && matchingTimeLimit !== undefined) {
                        this.set(matchingTimeLimit);
                        fp.config.minTime.setFullYear(latest.getFullYear());
                        fp.config.maxTime.setFullYear(latest.getFullYear());
                        fp.config.minTime.setMonth(latest.getMonth());
                        fp.config.maxTime.setMonth(latest.getMonth());
                        fp.config.minTime.setDate(latest.getDate());
                        fp.config.maxTime.setDate(latest.getDate());
                        if (compareDates(latest, fp.config.maxTime, false) > 0) {
                            fp.setDate(new Date(latest.getTime()).setHours(fp.config.maxTime.getHours(), fp.config.maxTime.getMinutes(), fp.config.maxTime.getSeconds(), fp.config.maxTime.getMilliseconds()), false);
                        }
                        else if (compareDates(latest, fp.config.minTime, false) < 0)
                            fp.setDate(new Date(latest.getTime()).setHours(fp.config.minTime.getHours(), fp.config.minTime.getMinutes(), fp.config.minTime.getSeconds(), fp.config.minTime.getMilliseconds()), false);
                    }
                    else {
                        const newMinMax = state.defaults || {
                            minTime: undefined,
                            maxTime: undefined,
                        };
                        this.set(newMinMax);
                        if (!latest)
                            return;
                        const { minTime, maxTime } = fp.config;
                        if (minTime && compareTimes(latest, minTime) < 0) {
                            fp.setDate(new Date(latest.getTime()).setHours(minTime.getHours(), minTime.getMinutes(), minTime.getSeconds(), minTime.getMilliseconds()), false);
                        }
                        else if (maxTime && compareTimes(latest, maxTime) > 0) {
                            fp.setDate(new Date(latest.getTime()).setHours(maxTime.getHours(), maxTime.getMinutes(), maxTime.getSeconds(), maxTime.getMilliseconds()));
                        }
                    }
                },
            };
        };
    }

    return minMaxTimePlugin;

})));
