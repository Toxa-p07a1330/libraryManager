import {TOGGLE_ADMIN} from "./actions";

export function toggleAdminReductor(state = new Object(), action){
    switch (action.type){
        case TOGGLE_ADMIN:
        {
            let clone = Object.assign({}, state);
            clone.isAdmin = !clone.isAdmin;
            return clone;

        }
        default:
            return state;
    }
}