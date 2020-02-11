import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';

const CreateMovie = () => {
    const [visible, setVisible] = useState(false)
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [cast, setCast] = useState('')
    const [producer, setProducer] = useState('')
    const [country, setCountry] = useState('')
    const [status, setStatus] = useState('')
    const [image, setImage] = useState('')
    const [genre, setGenre] = useState('')
    const [summary, setSummary] = useState('')
    
    const AlertFail = (props) => {
        props = [visible, setVisible]
        const onDismiss = () => setVisible(false);
      
        return (
          <Alert color="danger" isOpen={visible} toggle={onDismiss}>
            Fail to create product. Please fill all the required fields!
          </Alert>
        );
      }
      
    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${process.env.REACT_APP_BASE_URL}movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, cast, producer, country, status, image, genre, summary })
        }).then(response => response.json())
            .then((data) => {
                if (data) {
                    window.location.reload()
                } else {
                    setVisible(true)
                }
            })
            // .then(() => setModal(!modal))
    }
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button onClick={toggle}>Create new</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Create new</ModalHeader>
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

                    <AlertFail />
                </ModalBody>
                <ModalFooter>
                    <NavLink href='#' onClick={toggle}>Back</NavLink>{' '}
                    <Button onClick={handleSubmit}>Create</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateMovie;