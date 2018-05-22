import React from 'react';
import {MovieModel} from '../Models/MovieModel';
import {AutoMap} from "../../../Helpers/ModelHelper";
import {GetLastReducedData, UpdatePersistedData, GetPersistedDataByKey} from '../../../../Reducer/gravyBoadStateHelper';
import {SafeCopy} from "../../../../Utilities/ObjectUtilities";
import ToastUtilities from '../../../../Utilities/ToastUtilities';

import * as ApiTypes from '../../../Types/ApiTypes';
import * as MovieTypes from '../Models/MovieTypes';
import * as ToastTypes from '../../../Types/ToastrTypes';

//Extension files
import '../../../../Utilities/Extensions/StringExtentions';
import '../../../../Utilities/Extensions/ArrayExtensions';

//////////////////////////////////////////////////////////////////
//
//NOTE: The purpose of the V1 as the file name postfix is that
// you can have multiple versions of this file as your code grows.
// The controller can just reference you new version without
// code change on you controller. This lets you test your new
// version while keeping the old file around if needed for updates
// while creating and test your new version of this file
//
export function mapStateToProps(state){

    //Gravy Boat - Get last dispatched
    let reducedData = GetLastReducedData(state, MovieTypes.MOVIE_PREFIX, MovieTypes.MOVIE_LOAD_SUCCESS, MovieTypes.MoVIE_DISPATCH);
    let data = SafeCopy(reducedData.results);
    let type = reducedData.type;

    switch(type){

        case MovieTypes.MOVIE_LOAD_SUCCESS :

            for(let i=0;i<data.length;i++){
                let item = data[i];

                _addAdditionMovieColumns(item);

            }

            break;

        case MovieTypes.MOVIE_ADD_SUCCESS :

            if(data[0] === 'OK'){

                let addedMovie = data[ApiTypes.RESULT];

                //Adding additional columns that don't belong to the API result
                _addAdditionMovieColumns(addedMovie);

                data = GetPersistedDataByKey(reducedData.persisted, MovieTypes.MOVIE_LOAD_SUCCESS);

                data.push(addedMovie);

                //Toast Message
                _displayToastMessage('Movie Added. ID=' + addedMovie[MovieModel.p_MovieId.name], ToastTypes.SUCCESS);

                //Update the GravyBoat
                UpdatePersistedData(reducedData.persisted, data, MovieTypes.MoVIE_DISPATCH);

            } else {

                //Toast Message
                _displayErrorToastMessage(data[ApiTypes.RESULT]);

            }


            break;


        case MovieTypes.MOVIE_UPDATE_SUCCESS :

            if(data[0] === 'OK'){

                let updatedMovie = data[ApiTypes.RESULT];

                data = GetPersistedDataByKey(reducedData.persisted, MovieTypes.MOVIE_LOAD_SUCCESS);



                //find by ID and modify
                let itemIdx = data.findIndex(x => x[MovieModel.p_MovieId.name] === updatedMovie[MovieModel.p_MovieId.name]);

                if(itemIdx !== -1){

                    //***AutoMap
                    AutoMap(data[itemIdx], updatedMovie, MovieModel);

                }

                //Toast Message
                _displayToastMessage('Movie Updated.', ToastTypes.SUCCESS);

                //Update the GravyBoat
                UpdatePersistedData(reducedData.persisted, data, MovieTypes.MOVIE_LOAD_SUCCESS);

            } else {

                //Toast Message
                _displayErrorToastMessage(data[ApiTypes.RESULT]);

            }

            break;
    }


    return data;

}

function _displayErrorToastMessage(message){

    //Toast Message
    _displayToastMessage('Error! ' + message, ToastTypes.ERROR);


}

function _displayToastMessage(message, messageType){

    //Display any message
    ToastUtilities.DisplayMessage(message, messageType);

}

function _addAdditionMovieColumns(item){

    //Raw data is used for search or sorting
    item[MovieModel.p_releaseDateRaw.name] = new Date(item[MovieModel.p_ReleaseDate.name]);
    item[MovieModel.p_domesticGrossRaw.name] = item[MovieModel.p_DomesticGross.name].ConvertMoneyStringToDouble();

}