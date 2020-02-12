import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';
import { API_URL } from "../../config";

const EditMovie = (props) => {
    const [modal, setModal] = useState(false);
    const [sendRequest, setSendRequest] = useState(false)
    const [title, setTitle] = useState('');
    const [cast, setCast] = useState('')
    const [producer, setProducer] = useState('')
    const [country, setCountry] = useState('')
    const [status, setStatus] = useState('')
    const [image, setImage] = useState('')
    const [genre, setGenre] = useState('')
    const [summary, setSummary] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${API_URL}movies/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, cast, producer, country, status, image, genre, summary })
        }).then(response => response.json())
            .then((data) => {
                if (data.result) {
                    console.log(data)
                } else {
                    console.log(data)
                }
            }).then(() => setModal(!modal))
    }
    const toggle = () => {
        setModal(!modal)
        setSendRequest(!sendRequest)
    }
    useEffect(() => {
        if (sendRequest) {
            fetch(`${API_URL}movies/${props.id}`, {
                method: 'GET',
            }).then(response => response.json())
                .then((data) => {
                    setTitle(data.title)
                    setCast(data.cast)
                    setProducer(data.producer)
                    setCountry(data.country)
                    setStatus(data.status)
                    setImage(data.image)
                    setGenre(data.genre)
                    setSummary(data.summary)
                })
                setSendRequest(false)
        }
    }, [sendRequest])
    return (
        <div>
            <span onClick={toggle} style={{ cursor: 'pointer', float: 'right', fontSize: '35px', color: 'white', margin: '5px' }}><i style={{ float: 'right', fontSize: '35px', margin: '5px' }} className="fa fa-edit"></i></span>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Edit Movie</ModalHeader>
                <ModalBody>
                <Form>
                        <FormGroup>
                            <Input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                name="title"
                                type="text"
                                placeholder="Movie Title"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                value={cast}
                                onChange={e => setCast(e.target.value)}
                                type="text"
                                placeholder="Movie Casts"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            value={producer}
                            onChange={e => setProducer(e.target.value)}
                            type="text"
                            placeholder="Movie Producer" />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            type="text"
                            placeholder="Movie Country" />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            type="text"
                            placeholder="Movie Status" />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            value={image}
                            onChange={e => setImage(e.target.value)}
                            type="url"
                            placeholder="Movie Image URL" />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                            type="text"
                            placeholder="Movie Genre" />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                            type="text"
                            placeholder="Movie Summary" />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <NavLink href='#' onClick={toggle}>Back</NavLink>{' '}
                    <Button onClick={handleSubmit}>Update</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EditMovie;