import React, { Component } from 'react';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import { API_URL } from '../../config';
import NavBar from '../elements/NavBar/NavBar'
import "./Dashboard.css";
import FourColGrid from '../elements/FourColGrid/FourColGrid'

class FavoriteMovie extends Component {

    state = {
        movies: []
    }


    componentDidMount() {
        fetch(`${API_URL}favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => response.json())
            .then((data) => {
                if (data) {
                    this.setState({
                        movies: data
                    })
                } else {
                    throw new Error('Network response was not ok.')
                }
            })
            .catch((error) => (console.log(error)))
    }


    render() {
        const allMovies = this.state.movies.map((movie, i) => {
            return (
                <div key={i}>

                    <MovieThumb
                        clickable={true}
                        image={
                            movie.image
                                ? `${movie.image}`
                                : "./images/no_image.jpg"
                        }
                        movieId={movie.id}
                        movieName={movie.title}
                    />
                </div>

            )
        })


        return (
            <div className="rmdb-home">
                <NavBar />
                <div className="rmdb-home-grid">
                    <FourColGrid header="My Favorite Movies">
                        {allMovies}
                    </FourColGrid>
                </div>
            </div>
        )
    }
}

export default FavoriteMovie;
