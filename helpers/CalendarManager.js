import React from "react";
import {
    AlarmMethod,
    CalendarAccessLevel,
    createCalendarAsync,
    createEventAsync,
    deleteEventAsync,
    EntityTypes,
    getCalendarsAsync,
    getEventAsync,
    updateEventAsync,
} from "expo-calendar";
import {useDispatch, useSelector} from "react-redux";
import Actions from "../redux/Actions";
import {Platform} from "react-native";
import Colors from "../constants/Colors";
import useTranslator from "../hooks/useTranslator";
import {eventsSelectors} from "../redux/selectors/eventsSelector";

const CalendarTitle = 'UMK Calendar';

const getDefaultCalendarSource = async () => {
    const calendars = await getCalendarsAsync(EntityTypes.EVENT);
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].source;
};

/**
 * Create calendar for UMK events
 * @returns {Promise<string>} New calendar ID
 */
const createCalendar = async () => {
    const source = Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : {isLocalAccount: true, name: CalendarTitle};
    return await createCalendarAsync({
        title: CalendarTitle,
        color: Colors.PrussianBlue,
        entityType: EntityTypes.EVENT,
        sourceId: source.id,
        source: source,
        name: 'umkCalendar',
        ownerAccount: 'personal',
        accessLevel: CalendarAccessLevel.OWNER,
    });
};

/**
 * Get calendar ID that contains UMK events
 * @returns {Promise<string>} Calendar ID
 */
const getCalendarId = async () => {
    const calendar = (await getCalendarsAsync()).find(calendar => calendar.title === CalendarTitle);
    return calendar ? calendar.id : await createCalendar();
};

/**
 * Get calendar IDs that do not contain UMK events
 * @returns {Promise<string[]>} Array of calendar IDs
 */
const getCalendarIds = async () => {
    const ids = [];

    for (const calendar of await getCalendarsAsync()) {
        if (calendar.title === CalendarTitle)
            continue;

        ids.push(calendar.id);
    }

    return ids;
};

/**
 * @returns {?string}
 */
const extractAddress = event => {
    if (!event)
        return '';

    if (event?.show_location_link)
        return event.location_link;

    return event?.marker?.address;
};

export default function CalendarManager() {
    const dispatch = useDispatch();
    const translate = useTranslator();
    const events = useSelector(state => eventsSelectors.All(state));
    const {systemEventsMap, permissionGranted, projectCalendarId} = useSelector(state => state.calendar);

    // retrieve calendar IDs
    React.useEffect(() => {
        if (!permissionGranted)
            return;

        Promise.all([getCalendarId(), getCalendarIds()])
            .then(([project, others]) => dispatch(Actions.Calendar.SetCalendarIds({
                project,
                others,
            })));
    }, [permissionGranted]);

    // sync events with project calendar
    React.useEffect(() => {
        if (!permissionGranted)
            return;

        (async () => {
            const eventIds = events.map(event => String(event.id));
            const map = {...systemEventsMap};

            // create/update events in system calendar
            for (const event of events) {
                const remoteEventId = String(event.id);
                let systemEventId = map[remoteEventId];

                const details = {
                    title: translate(event.title),
                    location: extractAddress(event),
                    notes: translate(event.description)?.replace?.(["<br/>", "<br>"], "\n").replace(/(<([^>]+)>)/ig, ""),
                    startDate: event.start_date,
                    endDate: event.end_date,
                    allDay: !!event.is_full_day,
                    alarms: [],
                };

                if (event.reminder_offset) {
                    details.alarms.push({
                        relativeOffset: -(event.reminder_offset / 60),
                        method: AlarmMethod.ALERT,
                    });
                }

                // ensure event exists in system (was not deleted by user manually)
                if (systemEventId) {
                    try {
                        await getEventAsync(systemEventId);
                    } catch (e) {
                        if (e.message !== `Event with id ${systemEventId} could not be found`)
                            throw e;

                        // reset id if event was manually deleted in another calendar app
                        systemEventId = null;
                    }
                }

                if (!systemEventId)
                    systemEventId = await createEventAsync(projectCalendarId, details);
                else
                    updateEventAsync(systemEventId, details);

                map[remoteEventId] = systemEventId;
            }

            // remove events that were deleted from remote database
            for (const remoteId in map) {
                if (!eventIds.includes(String(remoteId))) {
                    map[remoteId] && deleteEventAsync(map[remoteId]);
                    delete map[remoteId];
                }
            }

            dispatch(Actions.Calendar.SetMap(map));
        })();
    }, [translate, events, permissionGranted]);

    return null;
}