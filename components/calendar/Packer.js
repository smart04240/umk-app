import moment from 'moment';

const offset = 100;

function buildEvent(column, left, width, dayStart) {
    const startTime = moment(column.start_date);
    const endTime = column.end_date
        ? moment(column.end_date)
        : startTime.clone().add(1, 'hour');
    const dayStartTime = startTime
        .clone()
        .hour(dayStart)
        .minute(0);
    const diffHours = startTime.diff(dayStartTime, 'hours', true);

    column.top = diffHours * offset;
    column.height = endTime.diff(startTime, 'hours', true) * offset;
    column.width = width;
    column.left = left;
    return column;
}

function collision(a, b) {
    return a.end_date > b.start_date && a.start_date < b.end_date;
}

function expand(ev, column, columns) {
    let colSpan = 1;

    for (let i = column + 1; i < columns.length; i++) {
        let col = columns[i];
        for (let j = 0; j < col.length; j++) {
            let ev1 = col[j];
            if (collision(ev, ev1)) {
                return colSpan;
            }
        }
        colSpan++;
    }

    return colSpan;
}

function pack(columns, width, calculatedEvents, dayStart) {
    let colLength = columns.length;

    for (let i = 0; i < colLength; i++) {
        let col = columns[i];
        for (let j = 0; j < col.length; j++) {
            let colSpan = expand(col[j], i, columns);
            let L = (i / colLength) * width;
            let W = (width * colSpan) / colLength - 10;

            calculatedEvents.push(buildEvent(col[j], L, W, dayStart));
        }
    }
}

function populateEvents(events, screenWidth, dayStart) {
    let lastEnd;
    let columns;
    let self = this;
    let calculatedEvents = [];

    events = events
        .map((ev, index) => ({...ev, index: index}))
        .sort(function (a, b) {
            if (a.start_date < b.start_date) return -1;
            if (a.start_date > b.start_date) return 1;
            if (a.end_date < b.end_date) return -1;
            if (a.end_date > b.end_date) return 1;
            return 0;
        });

    columns = [];
    lastEnd = null;

    events.forEach(function (ev, index) {
        if (lastEnd !== null && ev.start_date >= lastEnd) {
            pack(columns, screenWidth, calculatedEvents, dayStart);
            columns = [];
            lastEnd = null;
        }

        let placed = false;
        for (let i = 0; i < columns.length; i++) {
            let col = columns[i];
            if (!collision(col[col.length - 1], ev)) {
                col.push(ev);
                placed = true;
                break;
            }
        }

        if (!placed) {
            columns.push([ev]);
        }

        if (lastEnd === null || ev.end_date > lastEnd) {
            lastEnd = ev.end_date;
        }
    });

    if (columns.length > 0) {
        pack(columns, screenWidth, calculatedEvents, dayStart);
    }
    return calculatedEvents;
}

export default populateEvents;
