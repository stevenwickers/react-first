import {AttributeTypes} from './AttributesTypes';
import moment from 'moment';

class BaseModel{

    toString(){
        //This will output the model name value pair in a string.
        //Comma delimited

        debugger;

        let modelData = '';

        Object.entries(this.properties).forEach((props) =>{

            let prop = props[1];

            modelData += (prop.name + ' : ' + prop.value + ',');

        });

        if(modelData.slice(-1) == ','){
            modelData = modelData.slice(0, -1);
        }


        return modelData;
    }


    getProperty(attributeName){

       let result = this._getAttributeByName(attributeName);

       if(result != undefined){

           return result[1];

       }

       return result;

    }

    setProperty(attributeName, value){

        let result = this._getAttributeByName(attributeName);

        if(result != undefined){

            return result[1].value = value;

        }

    }

    resetAttributesValues(){

        debugger;

        let attributes = Object.entries(this.properties);


        for(let i=0;i<attributes.length;i++){

            let objIdx = attributes[i].findIndex(x => typeof x === 'object');

            if(objIdx == -1){
                continue;
            }

            let attributeType = attributes[i][objIdx].type;

            switch (attributeType){
                case AttributeTypes.string:
                    attributes[i][1].value = '';
                    break;

                case AttributeTypes.number:
                    attributes[i][1].value = 0;
                    break;

                case AttributeTypes.bool:
                    attributes[i][1].value = false;
                    break;

                case AttributeTypes.date:
                    attributes[i][1].value = moment();
                    break;
            }


        }

    }

    _getAttributeByName(attributeName){

        return Object.entries(this.properties).filter(x => x[1]['name'] == attributeName)[0];

    }


}

export default BaseModel;