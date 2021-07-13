import React from "react";
import {useDispatch, useSelector} from "react-redux";
import API from "./API";
import Actions from "../redux/Actions";
import {Image} from "react-native";

const recursiveCache = (promises, element) => {
    if (typeof element === 'string' && element.match(/\.(jpeg|jpg|gif|png)$/) != null)
        promises.push(Image.prefetch(element).catch(() => {}));
    else if (Array.isArray(element))
        element.forEach(value => recursiveCache(promises, value));
    else if (typeof element === 'object' && element !== null)
        Object.values(element).forEach(value => recursiveCache(promises, value));
};

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
            if (hasTasks)
                await API.Scheduler.runAll();

            API.fetch().then(async response => {
                // cache images recursively
                const cachePromises = [];
                recursiveCache(cachePromises, response.data);
                await Promise.all(cachePromises);

                // dispatch data
                dispatch(Actions.API.DataLoaded(response.data));
            });
        });
    }, [isOnline]);

    return null;
};
