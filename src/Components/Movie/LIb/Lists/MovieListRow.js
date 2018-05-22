import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import {MovieModel} from '../../../../GravyRepository/Controllers/Movies/Models/MovieModel';


const MovieListRow = ({movie, onEdit}) => {

    return (
        <tr>
            <td>{movie[MovieModel.p_MovieId.name]}</td>
            <td>{movie[MovieModel.p_MovieName.name]}</td>
            <td>{movie[MovieModel.p_ReleaseDate.name]}</td>
            <td>{movie[MovieModel.p_ProductionBudget.name]}</td>
            <td>
                <a href={movie[MovieModel.p_MovieLink.name]}>Movie Link</a>
            </td>
            <td>
                <a href="#" onClick={()=>onEdit(movie[MovieModel.p_MovieId.name])}>
                <FontAwesome
                    className=""
                    name="pencil"
                    size="lg"/></a>
            </td>
        </tr>

    );
};

MovieListRow.propTypes = {
    movie: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default MovieListRow;


