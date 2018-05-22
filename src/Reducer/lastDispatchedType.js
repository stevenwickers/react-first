
export default function lastDispatchedType(state=[], action){


    /*** Returns the last dispatch type ***/

    if(action.type !== '' && !action.type.startsWith('@@')){

        return action.type;
    }

    return state;


}

