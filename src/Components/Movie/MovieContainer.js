import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

//Controller - Container
import MovieController, {movieMapStateToProps} from '../../GravyRepository/Controllers/Movies/MovieController';
import MemberController, {memberMapStateToProps} from '../../GravyRepository/Controllers/Members/MemberController';
import {MemberModel} from "../../GravyRepository/Controllers/Members/Models/MemberModel";

//Movie Grid
import MovieList from './Lib/Lists/MovieList';

//Paging Control
import PagingControl from '../Common/Controls/Paging/PaginationControl';
import pagingModel from '../Common/Controls/Paging/Lib/Models/moviesPagingModel';

//Pages
import AddEditMoviePopup from './LIb/Pages/AddEditMoviePopup';

//Event Pages
import ControlEvents from './Lib/PageEventHandlers/ControlEvents';

//Styles
import '../Common/Styles/translucentStyles.css';
import '../Common/Styles/formSyles.css';
import '../Common/Styles/panelStyles.css';
import './Lib/CSS/MoviePageStyles.css';


//***************************************************************************
//
//*NOTE: Extra GravyBoat methods can be used to clear persisted data.
//
//      ClearAllPersistedData() -> Clears all persisted data.
//
//      ClearControllerPersistedData('#MOVIE_') -> clears all
//          movie persisted data. Make sure you pass in the prefix
//          to clear all movie persisted data or the exact type name
//          to remove one item.
//
//***************************************************************************

class MovieContainer extends React.Component{
    constructor(props){
        super(props);

        debugger;


        //The Controller
        this.MovieController = new MovieController(props);

        //Member Controller
        this.MemberController = new MemberController(props);

        //Get Movie Listings
        this.MovieController.Select();

        //Get Member #1
        this.MemberController.SelectById(1);


        //Movie Model
        this.model = this.MovieController.Model;



        //Bind Events
        ControlEvents.bind(this);

        this.state={
            pagingModel: new pagingModel(this,10,10),
            movieResult: [],
            isCalendarVisible: false,
            isFormVisible: false,
            modifyingMode: '',
        };

        //Sort Mode Event
        this.onSortModel = this.onSortModel.bind(this);

    }


    onSortModel(columnName){

        debugger;

        this.MovieController.SortModelData(this.props.movies, columnName);

    }


    render(){


        debugger;

        console.log('Refreshing!!!');

        //Set Paging Model Total
        pagingModel.setTotal(this.state.pagingModel, this.props.movies.length);

        const displayPopup = {
            'display' : this.state.isFormVisible ? 'block' : 'none'
        };

        return(
            <div>

                <div style={displayPopup}>

                    <AddEditMoviePopup model={this.model}
                                  title={this.state.modifyingMode}
                                  calendarVisible={this.state.isCalendarVisible}
                                  onCalClick={this.handelCalendarClick}
                                  onToggleCalendar={this.handleCalendarDisplay}
                                  onClose={this.handleCloseAddEditForm}
                                  onInputChange={this.handelInputChange}/>
                </div>

                <div style={{paddingLeft:15, paddingRight:15}}>

                    <div className="grid-container fluid panel" >

                        <div className="panel-header">
                            <div className="grid-x">
                                <div className="large-9 columns">
                                    Movie Listing {this.props.loading && 'Loading DATA....'}
                                </div>
                                {this.props.member.length > 0 &&

                                    <div className="large-3 columns memberFont">
                                        Member: {this.props.member[0][MemberModel.p_MemberFullName.name]} <br />
                                        Email:  {this.props.member[0][MemberModel.p_Email.name]}
                                    </div>

                                }

                            </div>
                        </div>


                        <div className="grid-x panel-body">

                            <div className=" medium-12 column ">

                                <MovieList searchResults={this.props.movies}
                                           pagingModel={this.state.pagingModel}
                                           onSort={this.onSortModel}
                                           onRowEdit={this.handleEditMovieForm}/>

                            </div>

                            <div className=" medium-12 column button-right-align">

                                <PagingControl model={this.state.pagingModel} />

                            </div>

                            <div className=" medium-12 columns">

                                <Link to=""
                                      className="button primary button-right-align"
                                      onClick={()=>this.handleAddMovieForm(0)}>Add</Link>

                            </div>


                        </div>

                    </div>
                </div>

            </div>

        )
    }
}

function mapStateToProps(state, ownProps){


    return{

        movies: movieMapStateToProps(state),
        member: memberMapStateToProps(state),

        loading: state.ajaxCallsInProcess > 0,

    }

}



export default connect(mapStateToProps)(MovieContainer)