import React from 'react';
import autoBind from '../../../../Utilities/autoBind';
import {MovieModel} from '../../../../GravyRepository/Controllers/Movies/Models/MovieModel';

const ModifyingModes = {
    Add: 'Add',
    Edit: 'Edit',
};

class ControlEvents{

    handelInputChange(model, e){
        debugger;

        //Use the Model Base method to get or set model property value
        //  by attribute name
        //
        //  i.e. : e.target.name -> movie_name
        //
        // you can use either the getProperty or setProperty to
        //  set the value of the property
        //
        // using the getProperty -> model.getProperty(e.target.name).value = e.target.value;
        //
        // NOTE: This will not cause a page refresh bc not state was updated
        //
        /////////////////////////////////////////////////////////////////////////////////////


        //More readable

        model.setProperty(e.target.name, e.target.value);

    }


    handleAddMovieForm(){

        //Clear properties
        this.model.resetAttributesValues();

        this.setState({
            modifyingMode: ModifyingModes.Add,
            isFormVisible: true,
        })
    }

    handleEditMovieForm(id){

        let item = this.props.movies.filter(x => x[MovieModel.p_MovieId.name] == id);

        this.model.properties = this.MovieController.TransposeObjectToModel(item, MovieModel);

        this.setState({
            modifyingMode: ModifyingModes.Edit,
            isFormVisible: true,
        })

    }

    handleCloseAddEditForm(isSaving){

        debugger;

        if(isSaving){

            switch (this.state.modifyingMode){
                case ModifyingModes.Add :

                    this.MovieController.Insert(this.model);

                    break;

                case ModifyingModes.Edit :

                    this.MovieController.Update(this.model);

                    break;

            }

        }

        //Clear properties
        this.model.resetAttributesValues();

        this.setState({
            modifyingMode: '',
            isFormVisible: false,
        })

    }


    handleCalendarDisplay(){

        let visible = this.state.isCalendarVisible;

        this.setState({
            isCalendarVisible: !visible,
        })

    }

    handelCalendarClick(id, e){

        debugger;

        let date = e._d;
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let year = date.getFullYear().toString();
        let dataFormatted = month + '/' + day + '/' + year;

        this.model.setProperty(id, dataFormatted);

        this.setState({
            isCalendarVisible: false,
        });



    }


    static bind(target){
        autoBind(ControlEvents, target)
    }

}

export default ControlEvents;