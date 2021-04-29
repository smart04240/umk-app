import {createEntityAdapter, createReducer} from '@reduxjs/toolkit';
import Actions from '../Actions';

export const toDoAdapter = createEntityAdapter({});

const initialState = toDoAdapter.getInitialState();

export default createReducer(initialState, builder => {
   builder
       .addCase(Actions.ToDos.upsertOne, toDoAdapter.upsertOne)
});
