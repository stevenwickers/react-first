/*
* THis is a const file the specifies the model properties. This is separated from the model
* so it can be used by other Controllers
*
* Note: Properties are prefixed with 'p_' for IntelliSense to better find properties.
*           Some properties are internal non formatted Columns used for sorting or filtering can
*           be prefixed with 'p__' that contains two underscores.
*
*
*           Prefixes:
*
*           p_  : Property Prefix
*
* */

import {AttributeTypes} from '../../AttributesTypes';

export let MovieModel = {
    p_MovieId: {name:'movie_id', type: AttributeTypes.number, value:'', sealed: true, isIdField:true},
    p_MovieName: {name:'movie_name', type: AttributeTypes.string, value:''},
    p_ReleaseDate: {name:'release_date', type: AttributeTypes.string, value:''},
    p_WorldWideGross: {name:'worldwide_gross', type: AttributeTypes.string, value:''},
    p_ProductionBudget: {name:'production_budget', type: AttributeTypes.string,  value:''},
    p_MovieLink: {name:'movie_link', type: AttributeTypes.string,  value:''},
    p_DomesticGross: {name:'domestic_gross', type: AttributeTypes.string,  value:''},

    //Properties not part of the API return data
    p_releaseDateRaw: {name: 'raw_date', type: AttributeTypes.date, value:'', sealed: true},
    p_domesticGrossRaw: {name: 'raw_domestic_gross', type: AttributeTypes.number, value:'', sealed: true},
};



