import * as ApiStore from '../DataProvider/ApiStore';
import {beginAjaxCall, endAjaxCall, ajaxCallError} from '../DataProvider/Ajax/AjaxActions';

export function dispatchAction(type, data) {

    return {type: type, data}

}

export function getResults(url, type){
    return function(dispatch) {

        dispatch(beginAjaxCall())
        ApiStore.processGetPromise(url)
            .then((data) => {
                //debugger;

                dispatch(dispatchAction(type, data));

            })
            .catch((error) => {

                console.log(error);
                dispatch(endAjaxCall())

            });
    }
}

export function postResults(model, url, dispatchType) {
    return function(dispatch) {

        _processData(model, url, 'POST', dispatchType, dispatch);

    }
}

export function putResults(model, url, type) {
    return function(dispatch) {

        _processData(model, url, 'PUT', type, dispatch);

    }
}

export function deleteResults(model, url, type){
    return function(dispatch) {

        _processData(model, url, 'DELETE', type, dispatch);

    }

}

export function patchResults(){}

export function _processData(model, url, httpType, dispatchType, dispatch){

    dispatch(beginAjaxCall())
    ApiStore.processMaintainPromise(model, url, httpType)
        .then((data) => {

            dispatch(dispatchAction(dispatchType, data));

        })
        .catch((error) => {

            console.log(error);

            dispatch(endAjaxCall);
            dispatch(dispatchAction(dispatchType, error));

        });

}


