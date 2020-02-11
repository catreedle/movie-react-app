import React, { useEffect, useState, useCallback } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import "./Dashboard.css";
import CreateMovie from './CreateMovie'
import DeleteMovie from './DeleteMovie';
import EditMovie from './EditMovie';

import MovieThumb from '../elements/MovieThumb/MovieThumb'
import FourColGrid from '../elements/FourColGrid/FourColGrid'
import SearchBar from '../elements/SearchBar/SearchBar'

const Dashboard = (props) => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogout = () => {
        sessionStorage.clear()
    }
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}movies`, {
            method: 'GET',
        }).then(response => response.json())
            .then((data) => {
                if (data) {
                    setMovies([...movies, ...data])
                }
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const searchItems = useCallback(searchTerm => {
        let endpoint = ""
        setMovies([])
        setLoading(true)
        setSearchTerm(searchTerm);

        if (searchTerm === "") {
            endpoint = `${process.env.REACT_APP_BASE_URL}movies`;
        } else {
            endpoint = `${process.env.REACT_APP_BASE_URL}title/${searchTerm}`;
        }
        fetch(endpoint, {
            method: 'GET',
        }).then(response => response.json())
            .then((data) => {
                if (data) {
                    setMovies([...movies, ...data])
                }
            }).
            then(

                setLoading(false)
            )
            .catch((error) => {
                console.log(error)
            })
    }, [loading, searchTerm]
    );

    var allMovies =
        movies.map((movie, i) => {
            return (
                <div key={i}>
                    <DeleteMovie id={movie.id} title={movie.title} />
                    <EditMovie id={movie.id} />
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
            <Navbar expand="md">
                <Nav className="mr-auto" navbar>
                    <NavbarBrand>Movie List</NavbarBrand>
                    <NavItem>
                        <CreateMovie />
                    </NavItem>
                </Nav>
                <Nav>
                    <NavLink href="/" onClick={handleLogout}>Logout</NavLink>
                </Nav>
            </Navbar>
            <hr></hr>
            <SearchBar callback={searchItems} />
            <div className="rmdb-home-grid">
                <FourColGrid
                    header={searchTerm ? "Search Result" : "Popular Movies"}
                    loading={loading}
                >
                    {allMovies}
                </FourColGrid>
            </div>
        </div>
    );
}

export default Dashboard;