import {eventAdapter} from "../reducers/eventsReducer";

const {selectAll, selectById} = eventAdapter.getSelectors(state => state.events);

export const EventsSelectors = {
    All: selectAll,
    byId: selectById,
};
