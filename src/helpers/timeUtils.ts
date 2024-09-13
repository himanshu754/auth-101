import { DateTime } from "luxon";

const getTimezone = () => {
    const dt = DateTime.local();
    return dt.zoneName; //=> 'America/New_York'
};

const getMidNightDate = () => {
    const midnight = DateTime
        .utc()
        .setZone(getTimezone())
        .endOf("day");
    const now = DateTime
        .utc()
        .setZone(getTimezone());
    const difference = midnight.diff(now, "seconds");
    return Math.round(difference.seconds);
};

export {
    getTimezone, getMidNightDate,
};
