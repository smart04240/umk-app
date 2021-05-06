import React from "react";
import {useSelector} from "react-redux";
import API from "./API";

export default function DataManager() {
    const isOnline = useSelector(state => state.online);

    // when becoming online, run scheduled tasks (if any), then fetch new data
    React.useEffect(() => {
        if (!isOnline)
            return;

        API.Scheduler.hasTasks().then(async hasTasks => {
            if (!hasTasks)
                return;

            // todo await scheduled tasks

            await API.Scheduler.runAll();
        }).then(() => {
            // todo fetch new data and dispatch it into redux
        });
    }, [isOnline]);

    return null;
};
