import React, { Component } from 'react'

class Movie extends Component {
    state = {
        title: '',
        cast: '',
        producer: '',
        country: '',
        status: '',
        image: '',
        genre: '',
        summary: ''
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_BASE_URL}movies/${this.props.match.params.movieId}`, {
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
                    summary: data.summary
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <div>{this.state.title} ({this.state.status})</div>
                <div>Summary - {this.state.summary}</div>
                <div>Casts - {this.state.cast}</div>
                <div>Producer - {this.state.producer}</div>
                
            </div>
        )
    }
}

export default Movie