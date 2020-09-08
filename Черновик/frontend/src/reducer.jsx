import {bindActionCreators} from "redux";
import toggleAdmin from "./actions";
let reducer = (state =  new Map(), action)=>{
    switch (action.type)
    {
        case "TOGGLE_ADMIN":
        {
            let clone = Object.assign({}, state);
            clone.isAdmin = !clone.isAdmin;
            return clone;
        }
    }
}
const mapStateToProps = state=>{
    return{
        isAdmin: state.isAdmin,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        toggleAdmin: bindActionCreators(toggleAdmin, dispatch)
    }
}
export default reducer();