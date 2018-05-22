import ApiStore from '../DataProvider/ApiStore';
import * as MovieTypes from './types/MovieTypes';

export function loadMovieSuccess(selectorsSearchResults){
    debugger;
    return {type: MovieTypes.MOVIE_LOAD_SUCCESS, selectorsSearchResults}
}



export function getMovieData(){

    return function (dispatch) {

        //let url = '/movies/1/search/' + typeID + '/' + searchCriteria;
        let url = '/movies';

        ApiStore.getSearchResults(url)
            .then((data) => {
                debugger;
                dispatch(loadMovieSuccess(data))
            }).catch(error => {
            console.log(error);

        });
    }

    /*this.dispatch(
    return function(dispatch) {

        ApiStore.processGetPromise(url)
            .then((data) => {
                //debugger;

                dispatch(dispatchMovieAction(data));

            })
            .catch((error) => {

                console.log(error);

            });
    });*/

}