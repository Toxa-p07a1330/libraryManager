import * as actions from "./actions"
export function adminTogglerCreator(){
    return (dispatch)=>{
        dispatch(actions.toggleAdmin())
    }
}