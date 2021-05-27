import React from "react";
import {useDispatch, useSelector} from "react-redux";
import API from "./API";
import Actions from "../redux/Actions";

/**
 * Background service that runs scheduled tasks and refreshes application data
 * @returns {null}
 */
export default function DataManager() {
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);

    // when becoming online, run scheduled tasks (if any), then fetch new data
    React.useEffect(() => {
        if (!isOnline)
            return;

        API.Scheduler.hasTasks().then(async hasTasks => {
            if (hasTasks) {
                await API.Scheduler.runAll();
            }

            API.fetch().then(response => dispatch(Actions.API.DataLoaded(response.data)));
        });
    }, [isOnline]);

    return null;
};
