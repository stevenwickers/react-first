import React from 'react';
import BaseModel from '../../BaseModel';
import {MovieModel} from './MovieModel';

export default class MovieModelContainer extends BaseModel {
    constructor(){
        super();

        this.name = Symbol('MovieModel');

        //Properties points to the Movie Model
        this.properties = MovieModel;

    }
}

