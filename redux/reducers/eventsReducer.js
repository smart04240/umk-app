import {createEntityAdapter, createReducer} from '@reduxjs/toolkit';
import Actions from '../Actions';

export const eventAdapter = createEntityAdapter({});

const initState = eventAdapter.getInitialState();

export default createReducer(initState, builder => {
   builder
       .addCase(Actions.Calendar.upsertOne, eventAdapter.upsertOne)
       .addCase(Actions.Calendar.removeOne, eventAdapter.removeOne)
});
