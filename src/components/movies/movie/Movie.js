import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';
import { API_URL } from "../../../config";
import MovieThumb from "../../elements/MovieThumb/MovieThumb"
import "./Movie.css"
import FontAwesome from 'react-fontawesome';

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
        visit_counter: 0
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
    }

    render() {
        return (
            <div>
                <Navbar expand="md">
                    <Nav className="mr-auto" navbar>
                        <NavbarBrand href="/dashboard">Moviey</NavbarBrand>
                    </Nav>
                </Navbar>
                <hr></hr>
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