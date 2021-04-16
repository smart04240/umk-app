import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

export default createReducer( false, builder => {
    
	builder.addCase( Actions.Sidebar.Close, ( state, action ) => {
		return { open: false, duration: action.payload?.duration } 
	});

	builder.addCase( Actions.Sidebar.Open, state => ({ open: true }));
});
