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

export const MemberModel = {
    p_MemberID: {name:'member_id', type: AttributeTypes.number, value:'', sealed: true, isIdField:true},
    p_FirstName: {name:'first_name', type: AttributeTypes.string, value:''},
    p_LastName: {name:'last_name', type: AttributeTypes.string, value:''},
    p_Email: {name:'email_address', type: AttributeTypes.string, value:''},
    p_MemberDateRaw: {name:'member_since', type: AttributeTypes.date, value:''},


    //Properties not part of the API return data
    p_MemberDate: {name:'member_date_formatted', type: AttributeTypes.string, value:''},
    p_MemberFullName: {name:'full_Name', type: AttributeTypes.string,  value:''},
};



