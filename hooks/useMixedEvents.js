import React from "react";
import {useSelector} from "react-redux";
import {eventsSelectors} from "../redux/selectors/eventsSelector";
import moment from "moment";
import {getEventsAsync} from "expo-calendar";

const filter = async (rangeStart, rangeEnd, events) => {
    return Object.values(events).filter(event => {
        return rangeStart.isSameOrBefore(event.start_date) && rangeEnd.isSameOrAfter(event.end_date);
    });
};

const sort = (a, b) => {
    if (a.start_date < b.start_date)
        return -1;
    if (a.start_date > b.start_date)
        return 1;
    return 0;
};

export default function useMixedEvents(range) {
    const events = useSelector(state => eventsSelectors.All(state));
    const {selectedDate, otherCalendarIds} = useSelector(state => state.calendar);
    const [totalEvents, setTotalEvents] = React.useState([]);

    React.useEffect(() => {
        if (!selectedDate || !otherCalendarIds)
            return;

        const rangeStart = moment(selectedDate).startOf(range);
        const rangeEnd = moment(selectedDate).endOf(range);

        Promise.all([
            getEventsAsync(otherCalendarIds, rangeStart.toDate(), rangeEnd.toDate())
                .then(events => {
                    events.forEach(event => {
                        event.isSystemEvent = true;
                        event.start_date = event.startDate;
                        event.end_date = event.endDate;
                    });
                    return events;
                }),
            filter(rangeStart, rangeEnd, events),
        ]).then(([systemEvents, remoteEvents]) => {
            const mixedEvents = [...systemEvents, ...remoteEvents].sort(sort);

            if (range !== 'month') {
                setTotalEvents(mixedEvents);
                return;
            }

            const days = {};

            mixedEvents.forEach(event => {
                if (rangeStart.isAfter(event.start_date) || rangeEnd.isBefore(event.end_date))
                    return;

                const dayNumber = moment(event.start_date).format('YYYY-MM-DD');

                if (!days[dayNumber])
                    days[dayNumber] = [];

                days[dayNumber].push(event);
            });

            setTotalEvents(days);
        });
    }, [selectedDate, otherCalendarIds, range, events]);

    return totalEvents;
};
