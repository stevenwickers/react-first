import React from 'react';
import BaseController from '../BaseController';
import MemberContainer from './Models/MemberContainer';
import {MemberModel} from './Models/MemberModel';
import {GetLastReducedData, UpdatePersistedData, GetPersistedDataByKey} from '../../../Reducer/gravyBoadStateHelper';
import {mapStateToProps} from "./StateMappers/MemberStateMapperV1";


import * as MemberTypes from './Models/MemberTypes';

//Extension files
import '../../../Utilities/Extensions/StringExtentions';
import '../../../Utilities/Extensions/ArrayExtensions';
import {SafeCopy} from "../../../Utilities/ObjectUtilities";



export default class MemeberController extends BaseController {
    constructor(props) {
        super(props, 'members');

    }

    get Model(){

        return new MemberContainer();

    }

    CreateModelFromData(data){

        return this.TransposeObjectToModel(data, MemberModel);

    }


    /*** CRUD Operations! ***/
    SelectById(id){

        this.BaseSelect(this.apiGet, id.toString(), MemberTypes.MEMBER_LOAD_SUCCESS)

    }


    Select(queryString=''){

        this.BaseSelect(this.apiGet, queryString, MemberTypes.MEMBER_LOAD_SUCCESS)

    }

    Insert(model){

        this.BaseInsert(this.apiPost, model.properties, MemberTypes.MEMBER_ADD_SUCCESS);

    }

    Update(model){

        let id = model.properties.p_MovieId.value;

        this.BaseUpdate(this.apiPut, id, model.properties, MemberTypes.MEMBER_UPDATE_SUCCESS);


    }


    DeleteById(id){

        this.BaseDelete(this.apiDelete, id, MemberTypes.MEMBER_DELETE_SUCCESS);

    }


    ///NOT IMPLEMENTED
    Delete(model){

        let id = model.properties.p_MemberID.value;
        this.DeleteById(id);

    }


}



export function memberMapStateToProps(state){

    debugger;

    //Calling the MemberStateMapperV1 to get data
    //Alway return data!
    return mapStateToProps(state);

}