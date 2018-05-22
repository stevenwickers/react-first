import store from '../index';
import {SafeCopy} from '../Utilities/ObjectUtilities';


export function GetLastReducedData(state, type, persistedKey, newDispatchedKey=''){

    //*********************************************************************************
    //
    //This function will return the last dispatched data
    //
    // @state -> state from the Redux store
    //
    // @type -> is the Prefix code of the controller types
    //          i.e.: For movie controller MOVIE_ is the prefix since all
    //                movie type start with MOVIE
    //
    // @persistedKey -> If last dispatch type is not of the controller type
    //                  the persisted data of that controller will be passed back
    //
    //                  NOTE: persisted data is an array of object with id and data.
    //                        Usually the search results are persisted
    //
    // @newDispatchedKey -> This is a type that can be used so code format will
    //                      not be triggered.
    //                      i.e.: In the movie mapStateToProps the MOVIE_LOAD_SUCCESS
    //                            switch statement will loop over the items to format
    //                            the data. If just grabbing the data from persist no
    //                            need to re-format the data. Use a new Dispatch type
    //                            such as MOVIE_DISPATCH to just return the data to
    //                            calling page.
    //
    //*********************************************************************************

    let reducedData = SafeCopy(state.gravyBoat);
    let dispatchedType = state.lastDispatchedType;

    if(reducedData.length === 0){

        return {type: '', results: [], persisted: []};

    }

    if(dispatchedType.includes(type)){

        return SafeCopy(reducedData);

    } else {

        let persisted = reducedData.persisted.filter(x => x['id'] === persistedKey);

        if(persisted.length > 0){
            persisted = persisted[0].data;
        }

        return {
            type: newDispatchedKey === '' ? persistedKey : newDispatchedKey,
            results: persisted,
            persisted: reducedData.persisted,
        };

    }

}


export function GetPersistedDataByKey(persistedData, key){

    //*********************************************************************************
    //
    //Will retrieve persisted data from the GravyBoat from key
    //
    // @persistedDate - this is persisted data from GravyBoat
    //
    // @key - this is a model type
    //        i.e.: MOVIE_LOAD_SUCCESS
    //
    //*********************************************************************************

    let persistedItem = persistedData.filter(x => x['id'] === key);

    if(persistedItem.length > 0){

        let objIdx  = persistedItem.findIndex(x => typeof x === 'object');

        if(objIdx > -1){

            return SafeCopy(persistedItem[objIdx].data);

        }

        return [];

    }


}

export function UpdatePersistedData(allPersistedData, newPersistedData, persistedKey, dispatchType=''){

    //*********************************************************************************
    //
    // @allPersistedData - This is the persisted data currently within the store
    //                      This comes from the GetLastReducedData (lastDispatchedType)
    //
    // @newPersistedData - updated results to be updated within the store
    //
    // @persistedKey - The key that represents the persisted key within the store
    //                  the GravyBoat contains the last dispatched information along
    //                  with persisted data which is an array. Use this persisted key
    //                  to get to the persisted data needed
    //
    //
    // @[dispatchType] - Optional! If not passed in, it will be set to the persistedKey parameter
    //                   Use this so the controller Map To State switch statement is not
    //                     triggered. Just pass data back to the page
    //
    //*********************************************************************************


    if(dispatchType === ''){
        dispatchType = persistedKey;
    }

    let storeState = store;
    let persistedData = SafeCopy(allPersistedData);

    let dataIdx = persistedData.findIndex(x => x['id'] === persistedKey);

    if(dataIdx > -1){

        persistedData[dataIdx].data = newPersistedData;

    } else {

        persistedData.push(newPersistedData);
    }


    let newLastDispatch = Object.assign({},{
        type:dispatchType,
        data:newPersistedData,
        persisted: persistedData,
        updatePersistData: true,
    });


    //Cause Dispatch
    storeState.dispatch(newLastDispatch);

}


export function ClearAllPersistedData(){

    let newLastDispatch = Object.assign({},{
        type:"##",
        data:[],
        persisted: [],
        updatePersistData: true,
    });


    //Cause Dispatch
    store.dispatch(newLastDispatch);

}

export function ClearControllerPersistedData(prefixKey){

    debugger;

    //*********************************************************************************
    //
    //This will clear any persisted data the an individual controller has saved
    //
    // @prefixKey is the type used by the controller.
    //  i.e -> for the Movie Model type the prefix is '#Movie_'
    //
    //  Note: the prefixKey must start with only one hash-tag bc this code will
    //          add a hash-tag to the beginning of the key
    //
    //  *NOTE: The data will be dispatched and might cause and INFINITE LOOP!!!
    //          BE CAREFUL WERE YOU CALL THIS FUNCTION!
    //
    //*********************************************************************************

    let storeState = store.getState();
    let gravyBoat  = storeState.gravyBoat;
    let persistedData = SafeCopy(gravyBoat.persisted);
    let persistedDataCleansed = [];
    let controllerPrefix = "#" + prefixKey;

    for(let i=0;i<persistedData.length;i++){

        if(!persistedData[i]['id'].startsWith(controllerPrefix)){
            persistedDataCleansed.push(persistedData[i]);
        }
    }

    let newLastDispatch = Object.assign({},{
        type:'##',
        data:[],
        persisted: persistedDataCleansed,
        updatePersistData: true,
    });


    //Cause Dispatch
    store.dispatch(newLastDispatch);
}
