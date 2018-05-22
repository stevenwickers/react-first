import {SafeCopy} from "../Utilities/ObjectUtilities";

export default function GravyReducer(state=[], action){

    //*** GravyBoat ***//
    //
    // This reducer will create an object that contains the following attributes
    //      key     -> is the store key given within root reducer
    //      type    -> the last type which was dispatched
    //      result  -> the data that was dispatched
    //
    //      persisted -> this is an array of object which contain an id and data
    //                    id -> key which is usually the dispatched type
    //                    data -> data persisted to be able to modify data without
    //                              needed to call database for data again
    //
    // This does not replace REDUX reducers. This is used by the Gray Controllers without
    //    the need for multiple reducers.
    //
    // NOTE: To use this reducer the dispatched types must begin with a hash-tag '#'
    //       To persist data you dispatched type need to begin with two hash-tags '##'
    //       To clear pass in three hash-tags ('###') as the dispatch type
    //
    debugger;

    if(action.type.startsWith('#')) {

        let reducedData = action.data;
        let reducedType = action.type;
        let persist = state.persisted ? state.persisted : [];
        let updatePersistData = action.updatePersistData ? action.updatePersistData : false;

        let persistSafe = SafeCopy(persist);

        if(reducedType.startsWith('##')){
            //persist this data.
            //First check if exists and if so update else add

            if(reducedType.startsWith('###')){

                //Empty the persisted data!!!
                persistSafe = [];

            } else {

                if(updatePersistData){

                    if(state.persisted !== action.persisted){

                        persistSafe = SafeCopy(action.persisted);

                    }

                } else {

                    let itemIndex = persistSafe.findIndex(x => x['id'] === reducedType);

                    if (itemIndex > -1) {

                        persistSafe[itemIndex]['data'] = reducedData

                    } else {


                        let persistItem = {id: reducedType, data: reducedData};

                        persistSafe.push(persistItem)

                    }
                }

            }

        }


        return Object.assign({},{
            key: '',
            type:reducedType,
            results:reducedData,
            persisted: persistSafe,
        });

    }

    return state;

}