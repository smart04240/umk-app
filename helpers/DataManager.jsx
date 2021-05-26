import React from "react";
import {useDispatch, useSelector} from "react-redux";
import API from "./API";
import Actions from "../redux/Actions";

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

        API.events.categories().then(res => dispatch(Actions.EventCategories.collect(res?.data)));
    }, [isOnline]);

    return null;
};
