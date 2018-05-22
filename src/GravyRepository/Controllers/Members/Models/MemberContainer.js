import React from 'react';
import BaseModel from '../../BaseModel';
import {MemberModel} from './MemberModel';

export default class MovieModelContainer extends BaseModel {
    constructor(){
        super();

        this.name = Symbol('MemberModel');

        //Points for the Model Properties Const file
        this.properties = MemberModel;


    }


}
