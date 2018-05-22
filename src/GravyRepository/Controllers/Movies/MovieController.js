import React from 'react';

import BaseController from '../BaseController';
import MovieModelContainer from './Models/MovieModelContainer';
import {MovieModel} from './Models/MovieModel';
import {mapStateToProps} from "./StateMappers/MovieStateMapperV1";

import * as MovieTypes from './Models/MovieTypes';

//Extension files
import '../../../Utilities/Extensions/StringExtentions';
import '../../../Utilities/Extensions/ArrayExtensions';



export default class MovieController extends BaseController {
    constructor(props) {
        super(props, 'movies');

    }

    get Model(){

        return new MovieModelContainer();

    }

    SortModelData(data, columnName){

        debugger;

        this.BaseSortModel(data, columnName, MovieTypes.MOVIE_LOAD_SUCCESS);

    }


    CreateModelFromData(data){

        return this.TransposeObjectToModel(data, MovieModel);


    }


    /*** CRUD Operations! ***/
    SelectById(id){

        this.BaseSelect(this.apiGet, id.toString(), MovieTypes.MOVIE_LOAD_SUCCESS)

    }

    Select(queryString=''){

        this.BaseSelect(this.apiGet, queryString, MovieTypes.MOVIE_LOAD_SUCCESS)

    }

    Insert(model){

        this.BaseInsert(this.apiPost, model.properties, MovieTypes.MOVIE_ADD_SUCCESS);

    }

    Update(model){

        let id = model.properties.p_MovieId.value;

        this.BaseUpdate(this.apiPut, id, model.properties, MovieTypes.MOVIE_UPDATE_SUCCESS);


    }

    DeleteById(id){

        this.BaseDelete(this.apiDelete, id, MovieTypes.MOVIE_DELETE_SUCCESS);

    }

    Delete(model){

        ///NOT IMPLEMENTED
        let id = model.properties.p_MovieId.value;
        this.DeleteById(id);

    }

}


export function movieMapStateToProps(state){

    debugger;

    //Call the mapStateToProps from the Movie State Mapper file.
    //Always return the data
    return mapStateToProps(state);

}


