import React from 'react';
import {MemberModel} from '../Models/MemberModel';
import {GetLastReducedData, UpdatePersistedData, GetPersistedDataByKey} from '../../../../Reducer/gravyBoadStateHelper';
import {SafeCopy} from "../../../../Utilities/ObjectUtilities";

import * as MemberTypes from '../Models/MemberTypes';

//////////////////////////////////////////////////////////////////
//
//NOTE: The purpose of the V1 as the file name postfix is that
// you can have multiple versions of this file as your code grows.
// The controller can just reference you new version without
// code change on you controller. This lets you test your new
// version while keeping the old file around if needed for updates
// while creating and test your new version of this file
//
//The routes for insert and update user are in place. Try to extend
//this file to include the insert and update members
//
export function mapStateToProps(state) {

    debugger;

    //Gravy Boat - Get last dispatched
    let reducedData = GetLastReducedData(state, MemberTypes.MEMBER_PREFIX, MemberTypes.MEMBER_LOAD_SUCCESS);
    let data = SafeCopy(reducedData.results);
    let type = reducedData.type;


    switch(type){

        case MemberTypes.MEMBER_LOAD_SUCCESS :

            for(let i=0;i<data.length;i++){
                let item = data[i];

                _addAdditionMemberColumns(item);

            }

            break;

        case MemberTypes.MEMBER_ADD_SUCCESS :
        case MemberTypes.MEMBER_UPDATE_SUCCESS :
            break;

    }


    return data;

}

function _addAdditionMemberColumns(item){

    let fullName = item[MemberModel.p_LastName.name] +', ' + item[MemberModel.p_FirstName.name];
    item[MemberModel.p_MemberFullName.name] = fullName;

}