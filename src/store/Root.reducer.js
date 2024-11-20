import {combineReducers} from "redux"
import { UserReducer } from "./User/User.reducer"
import { EventsReducer } from "./Events/Events.reducer"
import { GroupsReducer } from "./Groups/Groups.reducers"
import { promptReducer } from "./prompt/prompt.reducer"


export const RootReducer = combineReducers({
    User: UserReducer,
    events: EventsReducer,
    groups: GroupsReducer,
    Prompts: promptReducer
})