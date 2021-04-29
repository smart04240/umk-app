import {toDoAdapter} from "../reducers/todosReducer";

const {selectAll, selectById} = toDoAdapter.getSelectors(state => state.todos);

export const ToDosSelectors = {
    All: selectAll,
    byId: selectById,
};
