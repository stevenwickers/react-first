import React from 'react'
import {ModelProperties, TransposeDataObjectToModel, TransposeModelToDataObject, GetPropertyValues, AutoMap} from '../Helpers/ModelHelper';
import * as ActionStore from '../ActionStore';
import '../../Utilities/Extensions/ArrayExtensions';
import {SafeCopy} from "../../Utilities/ObjectUtilities";


class BaseController extends React.Component {
    constructor(props, getUrl, postUrl=getUrl, putUrl=getUrl, deleteUrl=getUrl, patchUrl=getUrl){
        super();

        let {dispatch} = props;
        this.dispatch = dispatch;


        this.apiGet = getUrl;
        this.apiPost = postUrl;
        this.apiPut = putUrl;
        this.apiDelete = deleteUrl;
        this.apiPatch = patchUrl;

        //Sorting Data
        this.sortAscending = true;
        this.lastColumnSort = '';

    }


    BaseSortModel(modelData, columnName, dispatchType){

        debugger;

        let data = SafeCopy(modelData);
        let isAscending = this.sortAscending;
        let lastColumn = this.lastColumnSort;

        if(columnName !== lastColumn){

            data.SortData(columnName);
            lastColumn = columnName;
            isAscending = true;

        } else {

            isAscending = !isAscending;
            data.SortData(columnName, isAscending);

        }

        this.sortAscending = isAscending;
        this.lastColumnSort = lastColumn;

        //Some might not like using the Redux Store too much even on sort,
        //  but is you think about is you have to hold stat somewhere and a
        //  refresh is on its way. Might as well use Redux instead of writing
        //  a componentDidMount or componentWillReceiveProps. Let the plumbing
        //  work for you....

        this.dispatch(
            {type: dispatchType, data}
        );


    }

    BaseSelect(url, queryString, dispatchType){


        if(queryString !== ''){
            url += '/' + queryString;
        }

        this.dispatch(
            ActionStore.getResults(
                url,
                dispatchType,
            )
        );

    }

    BaseInsert(url, properties, dispatchType){

        let internalModel = this.TransposeToSchemaObject(properties);

        this.dispatch(
            ActionStore.postResults(
                internalModel,
                url,
                dispatchType,
            )
        );

    }

    BaseUpdate(url, id, properties, dispatchType){

        url = url + '/' + id;

        let internalModel = this.TransposeToSchemaObject(properties);

        this.dispatch(
            ActionStore.putResults(
                internalModel,
                url,
                dispatchType,
            )
        );

    }

    BaseDelete(url, id, dispatchType){
        //TODO

    }


    AutoMapModels(target, source, modelType){

        return AutoMap(target, source, modelType)

    }


    TransposeToSchemaObject(model){

        //Call Model Helper function
        return TransposeModelToDataObject(model);

    }

    TransposeObjectToModel(data, modelType){

        //Call Model Helper function
        return TransposeDataObjectToModel(data, modelType);

    }


}

export default BaseController;