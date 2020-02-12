import React, { Component } from 'react';
import { API_URL } from "../../../config";
import NavBar from '../../elements/NavBar/NavBar';
import MovieThumb from "../../elements/MovieThumb/MovieThumb"
import "./Movie.css"
import FontAwesome from 'react-fontawesome';
import HeartCheckbox from 'react-heart-checkbox';

class Movie extends Component {
    state = {
        title: '',
        cast: '',
        producer: '',
        country: '',
        status: '',
        image: '',
        genre: '',
        summary: '',
        visit_counter: 0,
        checked: false
    }

    componentDidMount() {
        fetch(`${API_URL}movies/${this.props.match.params.movieId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    title: data.title,
                    cast: data.cast,
                    producer: data.producer,
                    country: data.country,
                    status: data.status,
                    image: data.image,
                    genre: data.genre,
                    summary: data.summary,
                    visit_counter: data.visit_counter
                })
            })
            .catch((error) => {
                console.log(error)
            })

        fetch(`${API_URL}favorites/${this.props.match.params.movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => response.json())
            .then((data) => {
                if (data) {
                    this.setState({
                        checked: data
                    })
                }
            })
            .catch((error) => (console.log(error)))
    }

    onClick = () => {
        this.setState({ checked: !this.state.checked });
        if (!this.state.checked) {
            fetch(`${API_URL}favorites/${this.props.match.params.movieId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).catch((error) => console.log(error))
        } else {
            fetch(`${API_URL}favorites/${this.props.match.params.movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).catch((error) => console.log(error))
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="rmdb-movieinfo">
                    <div className="rmdb-movieinfo-content">
                        <div className="rmdb-movieinfo-thumb">
                            <MovieThumb
                                image={
                                    this.state.image
                                        ? `${this.state.image}`
                                        : "./images/no_image.jpg"
                                }
                                clickable={false}
                            />
                        </div>

                        <div className="rmdb-movieinfo-text">
                            <h1>{this.state.title}</h1>
                            <h3>SUMMARY</h3>
                            <p>{this.state.summary}</p>
                        </div>
                        <div className="heart-icon">
                            <HeartCheckbox checked={this.state.checked} onClick={this.onClick} />
                        </div>
                        <FontAwesome className="fa-eye" name="eye" size="5x" />
                        <p className="fa-text">Seen {this.state.visit_counter}</p>

                    </div>
                    <div className="rmdb-movieinfo-cast">
                        <h3>CASTS</h3>
                        <p>{this.state.cast}</p>
                        <hr></hr>
                        <p>GENRE</p>
                        <p>{this.state.genre}</p>
                        <hr></hr>
                        <p>PRODUCER</p>
                        <p>{this.state.producer}</p>
                        <hr></hr>
                        <p>COUNTRY</p>
                        <p>{this.state.country}</p>
                        <hr></hr>
                        <p>STATUS</p>
                        <p>{this.state.status}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie